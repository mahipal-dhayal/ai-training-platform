"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // same as DashboardPage
import Link from "next/link";
export default function CertificatePage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [canDownload, setCanDownload] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { user, loading } = useAuth(); // ✅ from context
  const router = useRouter();

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchProgress() {
      const token = await getIdToken(user!);
      setUserEmail(user!.email || "");

      const res = await fetch("http://localhost:5000/api/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCompleted(data.completedModules || []);
      }
    }

    fetchProgress();
  }, [user, loading]);

  useEffect(() => {
    if (completed.length === 5) {
      setCanDownload(true);
    }
  }, [completed]);

  async function generateCertificate() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText("Certificate of Completion", {
      x: 150,
      y: 300,
      size: 24,
      font,
      color: rgb(0, 0, 0.7),
    });

    page.drawText(`Awarded to: ${userEmail}`, {
      x: 160,
      y: 250,
      size: 18,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const date = new Date().toLocaleDateString();
    page.drawText(`Date: ${date}`, {
      x: 160,
      y: 210,
      size: 14,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes.buffer as ArrayBuffer)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "AI_Training_Certificate.pdf";
    link.click();
  }

  // ✅ While loading, show loading text
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-700">🔄 Checking login...</div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">
        🎉 Your AI Training Certificate
      </h1>

      {canDownload ? (
        <>
          <p className="mb-4 text-lg text-green-700">
            You've completed all modules!
          </p>
          <button
            onClick={generateCertificate}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
          >
            🏆 Download Certificate
          </button>
        </>
      ) : (
        <>
          <p className="text-red-500">
            ❌ You haven’t completed all modules yet.
          </p>
          <p className="text-gray-600 mt-2">
            Complete all modules to unlock your certificate.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
          >
            Go to Dashboard & Complete Modules
          </Link>
        </>
      )}
    </div>
  );
}
