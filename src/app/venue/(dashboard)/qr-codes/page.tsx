"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, ExternalLink, QrCode } from "lucide-react";
import { useTranslations } from "@/i18n/client";
import { QrGenerator } from "@/components/venue/qr-codes/QrGenerator";

type QrCodeType = {
  id: string;
  type: "PERSONAL" | "TABLE" | "VENUE";
  label: string | null;
  shortCode: string;
  status: string;
};

export default function QrCodesPage() {
  const [venueQr, setVenueQr] = useState<QrCodeType | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [venueName, setVenueName] = useState<string>("");
  const t = useTranslations("venue.qr");

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
            const venueCode =
              codes.find((qr: QrCodeType) => qr.type === "VENUE") ||
              codes.find((qr: QrCodeType) => qr.type === "TABLE") ||
              codes[0];
            setVenueQr(venueCode || null);
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(t("failedToLoad"));
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setError(t("failedToDownload"));
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* QR Code Card */}
      {venueQr ? (
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-4">
              {/* QR Preview */}
              <div className="w-40 h-40 bg-white rounded-xl p-3 shadow-sm">
                <img
                  src={`/api/qr/${venueQr.id}/download?format=svg`}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <div className="font-medium">{venueName || t("venueQr")}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1 break-all px-4">
                  {baseUrl}/tip/{venueQr.shortCode}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 justify-center w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-w-[120px]"
                  onClick={() =>
                    window.open(`${baseUrl}/tip/${venueQr.shortCode}`, "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  Открыть
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 min-w-[120px]"
                  onClick={() => handleDownload(venueQr.id, "png")}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  PNG
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 min-w-[120px]"
                  onClick={() => handleDownload(venueQr.id, "svg")}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  SVG
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <QrCode className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">{t("qrWillBeCreated")}</p>
          </CardContent>
        </Card>
      )}

      {/* Materials Constructor */}
      {venueQr && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-heading font-semibold">
              Конструктор материалов
            </h2>
            <p className="text-muted-foreground text-sm">
              Создайте материалы для печати
            </p>
          </div>
          <QrGenerator shortCode={venueQr.shortCode} venueName={venueName} />
        </div>
      )}
    </div>
  );
}
