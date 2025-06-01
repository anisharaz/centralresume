"use client";
import { usePDF } from "@react-pdf/renderer";
import { ResumeDataType } from "@/lib/types";
import dynamic from "next/dynamic";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { getFilePlugin } from "@react-pdf-viewer/get-file";

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);
const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false }
);

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ResumePDFDocument } from "./react-pdf-document";

export default function PDFViewer({
  resumeData,
}: {
  resumeData: ResumeDataType;
}) {
  const [instance] = usePDF({
    document: <ResumePDFDocument resumeData={resumeData} />,
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: () => {
      return `${resumeData.personal_details.name.replace(
        /\s+/g,
        "_"
      )}_Resume.pdf`;
    },
  });
  if (instance.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (instance.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading PDF: {instance.error}</p>
      </div>
    );
  }
  return (
    <div
      style={{
        maxHeight: "100vh",
        height: "100vh",
      }}
    >
      <div className="w-fit mx-auto bg-white flex items-center justify-center rounded-full text-black px-2 py-1 m-2">
        <div>{getFilePluginInstance.DownloadButton()}</div>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs">
        <Viewer
          theme={{
            theme: "dark",
          }}
          fileUrl={instance.url as string}
          plugins={[defaultLayoutPluginInstance, getFilePluginInstance]}
        />
      </Worker>
    </div>
  );
}
