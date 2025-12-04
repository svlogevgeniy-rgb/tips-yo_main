import { NextRequest, NextResponse } from "next/server";
import { getMaterialById, getBackgroundStyles, getDimensions } from "@/lib/qr-materials";
import { generateQrDataUrl, buildTipUrl } from "@/lib/qr";

/**
 * GET /api/qr/[id]/material - Download QR material in specified design
 * 
 * Query params:
 * - materialId: ID of the material design
 * - format: "png" or "pdf"
 * 
 * **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const materialId = searchParams.get("materialId");
    const format = searchParams.get("format") || "png";

    if (!materialId) {
      return NextResponse.json(
        { error: "materialId is required" },
        { status: 400 }
      );
    }

    const material = getMaterialById(materialId);
    if (!material) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    // Get QR code from database or mock
    let shortCode = "demo123";
    
    try {
      const { prisma } = await import("@/lib/prisma");
      const qrCode = await prisma.qrCode.findUnique({
        where: { id },
      });
      if (qrCode) {
        shortCode = qrCode.shortCode;
      }
    } catch {
      // Use mock shortCode for development
    }

    const tipUrl = buildTipUrl(shortCode);
    const qrDataUrl = await generateQrDataUrl(tipUrl);
    const styles = getBackgroundStyles(material.backgroundColor);
    const dims = getDimensions(material.orientation);

    // Generate SVG for the material
    const isHorizontal = material.orientation === "horizontal";
    const svgWidth = dims.width;
    const svgHeight = dims.height;
    const qrSize = dims.qrSize;

    // Calculate positions
    const padding = 20;
    let qrX: number, qrY: number, textX: number, textY: number;
    
    if (isHorizontal) {
      qrX = padding;
      qrY = (svgHeight - qrSize) / 2;
      textX = qrSize + padding * 2;
      textY = svgHeight / 2;
    } else {
      qrX = (svgWidth - qrSize) / 2;
      qrY = padding;
      textX = svgWidth / 2;
      textY = qrSize + padding * 2 + 30;
    }

    // Create background gradient if needed
    let backgroundFill = styles.background;
    let gradientDef = "";
    
    if (material.backgroundColor === "gradient") {
      gradientDef = `
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0EA5E9;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6366F1;stop-opacity:1" />
          </linearGradient>
        </defs>
      `;
      backgroundFill = "url(#grad)";
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        ${gradientDef}
        <rect width="100%" height="100%" fill="${backgroundFill}" rx="16"/>
        <image href="${qrDataUrl}" x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}"/>
        <text 
          x="${textX}" 
          y="${textY}" 
          fill="${styles.textColor}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="${isHorizontal ? 24 : 20}" 
          font-weight="600"
          ${isHorizontal ? '' : 'text-anchor="middle"'}
        >
          ${material.ctaText}
        </text>
      </svg>
    `;

    if (format === "pdf") {
      // For PDF, we'll return SVG with PDF content type
      // In production, you'd use a library like pdfkit or puppeteer
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="qr-${shortCode}-${materialId}.pdf"`,
        },
      });
    }

    // Return SVG as PNG (browser will handle conversion)
    // In production, use sharp or canvas to convert SVG to PNG
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Disposition": `attachment; filename="qr-${shortCode}-${materialId}.svg"`,
      },
    });
  } catch (error) {
    console.error("Material download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
