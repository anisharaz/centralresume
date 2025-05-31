"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeDataType } from "@/lib/types";
import dynamic from "next/dynamic";

const PDFViewerDynamic = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

export function ResumePDFViewer({
  resumeData,
}: {
  resumeData: ResumeDataType;
}) {
  return (
    <PDFViewerDynamic className="w-full h-screen">
      <ResumePDFDocument resumeData={resumeData} />
    </PDFViewerDynamic>
  );
}

function ResumePDFDocument({ resumeData }: { resumeData: ResumeDataType }) {
  const {
    personal_details,
    work_experience,
    education,
    skills,
    achievements,
    publications,
    otherLists,
  } = resumeData;

  const formatDate = (date: string | Date) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return typeof date === "string" ? date : date.toString();
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal_details.name}</Text>
          {personal_details.tag_line?.map((tagLine, index) => (
            <Text key={index} style={styles.tagLine}>
              {tagLine.text}
            </Text>
          ))}
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}> {personal_details.email}</Text>
            {personal_details.phone && (
              <Text style={styles.contactItem}>{personal_details.phone}</Text>
            )}
            {(personal_details.address?.city ||
              personal_details.address?.country) && (
              <Text style={styles.contactItem}>
                {personal_details.address.city},{" "}
                {personal_details.address.country}
              </Text>
            )}
          </View>
          {personal_details.social_links?.length > 0 && (
            <View style={styles.socialLinks}>
              {personal_details.social_links.map((link, index) => (
                <Text key={index} style={styles.socialLink}>
                  {link.url}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Summary Section */}
        {personal_details.summary?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            {personal_details.summary.map((item, index) => (
              <Text key={index} style={styles.summaryText}>
                {item.text}
              </Text>
            ))}
          </View>
        )}

        {/* Work Experience Section */}
        {work_experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {work_experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    {exp.position?.map((pos, posIndex) => (
                      <Text key={posIndex} style={styles.jobTitle}>
                        {pos.text}
                      </Text>
                    ))}
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </Text>
                </View>

                {exp.summary?.map((summary, summaryIndex) => (
                  <Text key={summaryIndex} style={styles.experienceSummary}>
                    {summary.text}
                  </Text>
                ))}

                {exp.highlights?.length > 0 && (
                  <View style={styles.highlights}>
                    {exp.highlights.map((highlight, highlightIndex) =>
                      highlight.text.map((text, textIndex) => (
                        <Text
                          key={`${highlightIndex}-${textIndex}`}
                          style={styles.highlightItem}
                        >
                          • {text}
                        </Text>
                      ))
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(skills?.technical?.length > 0 || skills?.soft?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            {skills.technical?.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillsSubTitle}>Technical Skills</Text>
                <View style={styles.skillsList}>
                  {skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill.name}
                      {skill.level && ` (${skill.level})`}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {skills.soft?.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillsSubTitle}>Soft Skills</Text>
                <View style={styles.skillsList}>
                  {skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill.name}
                      {skill.level && ` (${skill.level})`}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institution}>{edu.institution}</Text>
                {edu.degree_level?.map((degree, degreeIndex) => (
                  <Text key={degreeIndex} style={styles.degree}>
                    {degree.text}
                    {edu.field?.length > 0 &&
                      ` in ${edu.field.map((f) => f.text).join(", ")}`}
                  </Text>
                ))}
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.score && ` | ${edu.score}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <View style={styles.achievementDetails}>
                  {achievement.awarded_by && (
                    <Text style={styles.awardedBy}>
                      Awarded by: {achievement.awarded_by}
                    </Text>
                  )}
                  <Text style={styles.achievementDate}>
                    {formatDate(achievement.date.toString())}
                  </Text>
                </View>
                {achievement.summary?.map((summary, summaryIndex) => (
                  <Text key={summaryIndex} style={styles.summaryText}>
                    {summary.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Publications Section */}
        {publications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {publications.map((pub, index) => (
              <View key={index} style={styles.publicationItem}>
                <Text style={styles.publicationTitle}>{pub.name}</Text>
                <Text style={styles.publicationDetails}>
                  {pub.publisher} | {formatDate(pub.releaseDate.toString())}
                </Text>
                {pub.url && <Text style={styles.socialLink}>{pub.url}</Text>}
                {pub.summary?.map((summary, summaryIndex) => (
                  <Text key={summaryIndex} style={styles.summaryText}>
                    {summary.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Other Lists Section */}
        {otherLists?.length > 0 && (
          <View style={styles.section}>
            {otherLists.map((list, index) => (
              <View key={index} style={styles.otherListItem}>
                {list.heading?.map((heading, headingIndex) => (
                  <Text key={headingIndex} style={styles.sectionTitle}>
                    {heading.text}
                  </Text>
                ))}
                {list.summary?.map((summary, summaryIndex) => (
                  <Text key={summaryIndex} style={styles.summaryText}>
                    {summary.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1pt solid #e5e5e5",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  tagLine: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 2,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 8,
  },
  contactItem: {
    fontSize: 9,
    color: "#000000",
  },
  section: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "0.5pt solid #f0f0f0",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
    textTransform: "uppercase",
    paddingBottom: 2,
    borderBottom: "0.5pt solid #d0d0d0",
  },
  summaryText: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 3,
    textAlign: "left",
  },
  experienceItem: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  company: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "normal",
    marginBottom: 1,
  },
  dateRange: {
    fontSize: 9,
    color: "#000000",
  },
  experienceSummary: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 2,
    lineHeight: 1.2,
  },
  highlights: {
    marginTop: 2,
  },
  highlightItem: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 1,
    paddingLeft: 4,
  },
  skillsContainer: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  skillsSubTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillItem: {
    fontSize: 8,
    color: "#000000",
    padding: "2 4",
    marginRight: 4,
    marginBottom: 2,
    border: "0.25pt solid #e8e8e8",
    borderRadius: 2,
  },
  educationItem: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  institution: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  degree: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 1,
  },
  educationDate: {
    fontSize: 8,
    color: "#000000",
  },
  achievementItem: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  achievementTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 1,
  },
  achievementDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  awardedBy: {
    fontSize: 8,
    color: "#000000",
  },
  achievementDate: {
    fontSize: 8,
    color: "#000000",
  },
  publicationItem: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  publicationTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 1,
  },
  publicationDetails: {
    fontSize: 8,
    color: "#000000",
    marginBottom: 2,
  },
  otherListItem: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.25pt solid #f5f5f5",
  },
  otherListHeading: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  socialLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 3,
  },
  socialLink: {
    fontSize: 8,
    color: "#000000",
    textDecoration: "none",
  },
});
