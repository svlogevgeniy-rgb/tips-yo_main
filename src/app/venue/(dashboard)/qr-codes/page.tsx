"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Download, ExternalLink, FileImage, FileText } from "lucide-react";
import { QR_MATERIALS, getBackgroundStyles, QrMaterial } from "@/lib/qr-materials";

type QrCode = {
  id: string;
  type: "PERSONAL" | "TABLE" | "VENUE";
  label: string | null;
  shortCode: string;
  status: string;
};

export default function QrCodesPage() {
  const [venueQr, setVenueQr] = useState<QrCode | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingMaterial, setDownloadingMaterial] = useState<string | null>(null);
  const [venueName, setVenueName] = useState<string>("");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    async function fetchData() {
      try {
        const dashRes = await fetch("/api/venues/dashboard?period=week");
        if (!dashRes.ok) throw new Error("Failed to load venue");
        const dashData = await dashRes.json();

        if (dashData.venue?.id) {
          setVenueName(dashData.venue.name || "");

          const qrRes = await fetch(`/api/qr?venueId=${dashData.venue.id}`);
          if (qrRes.ok) {
            const qrData = await qrRes.json();
            const codes = qrData.qrCodes || [];
            // Find venue QR (type VENUE or first TABLE)
            const venueCode = codes.find((qr: QrCode) => qr.type === "VENUE") 
              || codes.find((qr: QrCode) => qr.type === "TABLE")
              || codes[0];
            setVenueQr(venueCode || null);
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Не удалось загрузить QR-код");
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDownload = async (qrId: string, format: "png" | "svg") => {
    try {
      const response = await fetch(`/api/qr/${qrId}/download?format=${format}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${venueName.replace(/\s+/g, "-").toLowerCase() || "venue"}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      setError("Не удалось скачать QR-код");
    }
  };

  const handleDownloadMaterial = async (material: QrMaterial, format: "png" | "pdf") => {
    if (!venueQr) return;
    
    setDownloadingMaterial(`${material.id}-${format}`);
    try {
      const response = await fetch(`/api/qr/${venueQr.id}/material?materialId=${material.id}&format=${format}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${venueName.replace(/\s+/g, "-").toLowerCase() || "venue"}-${material.id}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download material failed:", err);
      setError("Не удалось скачать материал");
    } finally {
      setDownloadingMaterial(null);
    }
  };

  const MaterialPreview = ({ material }: { material: QrMaterial }) => {
    const styles = getBackgroundStyles(material.backgroundColor);
    const isHorizontal = material.orientation === "horizontal";
    
    return (
      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:border-primary/30 transition-colors">
        <div 
          className="p-4 flex items-center justify-center"
          style={{ background: styles.background, minHeight: isHorizontal ? "100px" : "160px" }}
        >
          <div className={`flex ${isHorizontal ? "flex-row gap-4" : "flex-col gap-3"} items-center`}>
            <div 
              className="rounded-lg flex items-center justify-center"
              style={{ 
                width: isHorizontal ? "70px" : "90px",
                height: isHorizontal ? "70px" : "90px",
                backgroundColor: styles.qrColor === "#FFFFFF" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)",
              }}
            >
              <span className="text-xs font-mono" style={{ color: styles.qrColor === "#FFFFFF" ? "#000" : "#FFF" }}>QR</span>
            </div>
            <div className={`font-semibold ${isHorizontal ? "text-base" : "text-sm text-center"}`} style={{ color: styles.textColor }}>
              {material.ctaText}
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between bg-white/5">
          <span className="text-sm text-muted-foreground">{material.label}</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDownloadMaterial(material, "png")} 
              disabled={downloadingMaterial === `${material.id}-png` || !venueQr}
            >
              {downloadingMaterial === `${material.id}-png` ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <FileImage className="h-3 w-3" />
              )}
              <span className="ml-1">PNG</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDownloadMaterial(material, "pdf")} 
              disabled={downloadingMaterial === `${material.id}-pdf` || !venueQr}
            >
              {downloadingMaterial === `${material.id}-pdf` ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <FileText className="h-3 w-3" />
              )}
              <span className="ml-1">PDF</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">QR-код заведения</h1>
        <p className="text-muted-foreground">
          Скачайте и разместите QR-код для приёма чаевых
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Main QR Card */}
      {venueQr ? (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-heading">Ваш QR-код</CardTitle>
            <CardDescription>
              Гости сканируют этот код, чтобы оставить чаевые
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-40 bg-white rounded-xl p-3 flex items-center justify-center">
                <img 
                  src={`/api/qr/${venueQr.id}/download?format=svg`} 
                  alt="QR Code" 
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-lg font-medium mb-2">{venueName || "QR заведения"}</div>
                <div className="text-sm text-muted-foreground mb-4 break-all">
                  {baseUrl}/tip/{venueQr.shortCode}
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`${baseUrl}/tip/${venueQr.shortCode}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Открыть
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(venueQr.id, "png")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PNG
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(venueQr.id, "svg")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    SVG
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              QR-код будет создан автоматически после завершения настройки заведения
            </p>
          </CardContent>
        </Card>
      )}

      {/* Print Materials */}
      {venueQr && (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-heading">Материалы для печати</CardTitle>
            <CardDescription>
              Готовые дизайны для размещения на столах, стойке или у входа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Горизонтальные</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {QR_MATERIALS.filter(m => m.orientation === "horizontal").map((material) => (
                  <MaterialPreview key={material.id} material={material} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Вертикальные</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {QR_MATERIALS.filter(m => m.orientation === "vertical").map((material) => (
                  <MaterialPreview key={material.id} material={material} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
