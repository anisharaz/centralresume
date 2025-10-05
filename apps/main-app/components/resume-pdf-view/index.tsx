"use client";

import { ResumeDataType } from "@centralresume/resume-core/types";
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./viewer"), {
  ssr: false,
  loading: () => <div>Loading PDF Viewer...</div>,
});

function ResumePDFViewer({ resumeData }: { resumeData: ResumeDataType }) {
  return <Viewer resumeData={resumeData} />;
}

export default ResumePDFViewer;
