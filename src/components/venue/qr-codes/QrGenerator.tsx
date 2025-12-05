"use client";

import React, { useState, useEffect } from "react";
import {
  QrDesignState,
  MaterialType,
  MATERIAL_TYPES,
  DEFAULT_CTA_TEXTS,
} from "@/lib/qr-materials";
import { MaterialPreview } from "./MaterialPreview";
import { QrPdfDocument } from "./PdfTemplates";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from "qrcode";
import { Download, Upload, Palette, FileText } from "lucide-react";

interface QrGeneratorProps {
  shortCode: string;
  venueName: string;
}

const PRESET_COLORS = [
  { name: "Белый", base: "#FFFFFF", accent: "#000000" },
  { name: "Тёмный", base: "#1F2937", accent: "#FFFFFF" },
  { name: "Зелёный", base: "#059669", accent: "#FFFFFF" },
  { name: "Синий", base: "#0EA5E9", accent: "#FFFFFF" },
  { name: "Оранжевый", base: "#F97316", accent: "#FFFFFF" },
  { name: "Красный", base: "#DC2626", accent: "#FFFFFF" },
];

export function QrGenerator({ shortCode, venueName }: QrGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [design, setDesign] = useState<QrDesignState>({
    materialType: "table-tent",
    baseColor: "#FFFFFF",
    accentColor: "#000000",
    ctaText: "Оставьте чаевые",
    showLogo: false,
    logoUrl: undefined,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const generateQr = async () => {
      try {
        const url = `${window.location.origin}/tip/${shortCode}`;
        const dataUrl = await QRCode.toDataURL(url, {
          width: 512,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF00",
          },
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error("QR Generation failed", err);
      }
    };
    generateQr();
  }, [shortCode]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign((prev) => ({
          ...prev,
          logoUrl: reader.result as string,
          showLogo: true,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isClient) return null;

  return (
    <div className="space-y-4">
      {/* Preview Card */}
      <Card className="glass overflow-hidden">
        <CardContent className="p-4">
          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center min-h-[280px]">
            <div className="w-full max-w-[240px] shadow-lg rounded-lg overflow-hidden">
              <MaterialPreview
                design={design}
                qrDataUrl={qrDataUrl}
                venueName={venueName}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Selection */}
      <Card className="glass">
        <CardContent className="p-4 space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Формат
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {MATERIAL_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() =>
                  setDesign((d) => ({
                    ...d,
                    materialType: type.id as MaterialType,
                  }))
                }
                className={`p-3 rounded-lg border text-left transition-all ${
                  design.materialType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                <div className="font-medium text-sm">{type.label.ru}</div>
                <div className="text-xs text-muted-foreground">
                  {type.description.ru}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Settings */}
      <Card className="glass">
        <CardContent className="p-4 space-y-4">
          <Label className="text-sm font-medium">Текст</Label>

          <Select
            value={design.ctaText}
            onValueChange={(v) => setDesign((d) => ({ ...d, ctaText: v }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите текст" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_CTA_TEXTS.map((text) => (
                <SelectItem key={text} value={text}>
                  {text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Или свой вариант..."
            value={design.ctaText}
            onChange={(e) => setDesign((d) => ({ ...d, ctaText: e.target.value }))}
          />

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="logo-switch" className="text-sm cursor-pointer">
              Логотип
            </Label>
            <Switch
              id="logo-switch"
              checked={design.showLogo}
              onCheckedChange={(c) => setDesign((d) => ({ ...d, showLogo: c }))}
            />
          </div>

          {design.showLogo && (
            <Button variant="outline" className="w-full relative overflow-hidden">
              <Upload className="w-4 h-4 mr-2" />
              {design.logoUrl ? "Изменить" : "Загрузить"}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleLogoUpload}
              />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Color Settings */}
      <Card className="glass">
        <CardContent className="p-4 space-y-4">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Цвет
          </Label>

          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map((c, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  design.baseColor === c.base
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border"
                }`}
                style={{ backgroundColor: c.base }}
                onClick={() =>
                  setDesign((d) => ({
                    ...d,
                    baseColor: c.base,
                    accentColor: c.accent,
                  }))
                }
                title={c.name}
              />
            ))}
            <div className="relative w-10 h-10">
              <input
                type="color"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={design.baseColor}
                onChange={(e) =>
                  setDesign((d) => ({ ...d, baseColor: e.target.value }))
                }
              />
              <div className="w-full h-full rounded-lg border-2 border-border bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="sticky bottom-4 z-10">
        {isClient && qrDataUrl ? (
          <PDFDownloadLink
            document={
              <QrPdfDocument
                design={design}
                qrDataUrl={qrDataUrl}
                venueName={venueName}
              />
            }
            fileName={`tipsio-${design.materialType}.pdf`}
            className="block"
          >
            {({ loading }) => (
              <Button
                className="w-full h-12 text-base font-semibold shadow-lg"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  "Генерация..."
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Скачать PDF
                  </>
                )}
              </Button>
            )}
          </PDFDownloadLink>
        ) : (
          <Button className="w-full h-12" size="lg" disabled>
            Загрузка...
          </Button>
        )}
      </div>
    </div>
  );
}
