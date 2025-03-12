
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Barcode, Camera, Check, X } from "lucide-react";
import { toast } from "sonner";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [barcode, setBarcode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMode, setScanMode] = useState<'manual' | 'camera'>('manual');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to handle manual barcode entry
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode) {
      onScan(barcode);
      toast.success(`Barcode scanned: ${barcode}`);
      setBarcode('');
    } else {
      toast.error("Please enter a barcode");
    }
  };

  // Function to simulate a successful scan for demo purposes
  const simulateScan = () => {
    const demoBarcode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
    setBarcode(demoBarcode);
    
    setTimeout(() => {
      onScan(demoBarcode);
      toast.success(`Barcode scanned: ${demoBarcode}`);
      setBarcode('');
    }, 1000);
  };

  // In a real app, this would connect to the device camera and use a barcode scanning library
  const startCameraScanning = async () => {
    setIsScanning(true);
    
    // This is just simulation code for demo - in a real app, you would:
    // 1. Get camera access
    // 2. Stream to video element
    // 3. Use a library like quagga.js or zxing to detect barcodes in frames
    
    try {
      // Simulate camera initialization
      toast.info("Camera initialized. Ready to scan.");
      
      // Simulate successful scan after a delay
      setTimeout(() => {
        simulateScan();
        setIsScanning(false);
      }, 3000);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const stopCameraScanning = () => {
    setIsScanning(false);
    // In a real app, you would stop the camera stream here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Barcode className="mr-2 h-5 w-5" />
          Barcode Scanner
        </CardTitle>
        <CardDescription>
          Scan or manually enter barcodes to quickly find items
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={scanMode} onValueChange={(value) => setScanMode(value as 'manual' | 'camera')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="camera">Camera Scan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <form onSubmit={handleManualSubmit} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter barcode number"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Scan</Button>
            </form>
            
            <div className="text-center pt-2">
              <Button type="button" variant="outline" onClick={simulateScan}>
                Simulate Scan
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="camera" className="space-y-4">
            <div className="relative bg-muted aspect-video rounded-md overflow-hidden flex items-center justify-center">
              {isScanning ? (
                <>
                  <video 
                    ref={videoRef} 
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  >
                    Your browser does not support video.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-primary">Scanning...</div>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center">
                  <Camera className="h-10 w-10 mb-2" />
                  <p>Camera preview will appear here</p>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            
            <div className="flex justify-center space-x-2">
              {!isScanning ? (
                <Button onClick={startCameraScanning}>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              ) : (
                <Button variant="destructive" onClick={stopCameraScanning}>
                  <X className="mr-2 h-4 w-4" />
                  Stop Scanning
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BarcodeScanner;
