"use client";
import ErrorPage from "@/components/error-page";

// import prisma from "@/lib/db";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const PDFViewerDynamic = dynamic(() =>
  import("@react-pdf/renderer").then((mod) => mod.PDFViewer),{
    ssr:false
  }
);

 function ViewResume(
//     {
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }
) {
  //   const { linkId, resumeTag } = await searchParams;
  //   if (!linkId || !resumeTag) {
  // return <CustomErrorPage message={"Link Not Found"} />;
  //   }
  //   const resumeLink = await prisma.resumeLink.findUnique({
  //     where: {
  //       id: linkId,
  //       resumeProfileTagName: resumeTag,
  //     },
  //     select: {
  //       visibility: true,
  //       resumeProfileTagName: true,
  //     },
  //   });

  //   if (!resumeLink || resumeLink.visibility == "PRIVATE") {
  //     return <ErrorPage message={"Link Not Found"} />;
  //   }

  return (
    <div>
      <PDFViewerDynamic className="w-full h-screen">
        <MyDocument />
      </PDFViewerDynamic>
    </div>
  );
}

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section} debug>
        <Text>Section </Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default ViewResume;
