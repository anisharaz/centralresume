import type { ResumeDataType } from "@/lib/types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define compact styles that match the sample resume format
const styles = StyleSheet.create({
  line: {
    height: 0.6,
    backgroundColor: "#242424",
    width: "100%",
    marginBottom: 4, // Reduced from 8
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20, // Reduced from 40
    paddingHorizontal: 40, // Reduced from 40
    // fontFamily: "Noto Sans Mono",
    fontSize: 10, // Reduced from 11
    lineHeight: 1.2, // Reduced from 1.3
  },
  // Header styles
  header: {
    alignItems: "center",
    marginBottom: 8, // Reduced from 20
    textAlign: "center",
  },
  name: {
    fontSize: 20, // Reduced from 24
    fontWeight: "bold",
    marginBottom: 4, // Reduced from 8
    color: "#000000",
  },
  contactLine: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    // marginBottom: 2,
    marginTop: 6,
    lineHeight: 0.8, // Reduced from 1.3
  },
  // Section styles
  sectionTitle: {
    fontSize: 12, // Reduced from 14
    fontWeight: "bold",
    marginTop: 12, // Reduced from 20
    marginBottom: 2, // Reduced from 10
    color: "#000000",
  },
  // Entry styles
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2, // Reduced from 5
  },
  entryTitle: {
    fontSize: 10, // Reduced from 11
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  entryDate: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    textAlign: "right",
  },
  // Content styles
  bulletPoint: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    marginBottom: 1, // Reduced from 3
    paddingLeft: 0,
  },
  paragraph: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    marginBottom: 4, // Reduced from 8
    lineHeight: 1.3, // Reduced from 1.4
    textAlign: "justify",
  },
  // Publication styles
  publicationTitle: {
    fontSize: 10, // Reduced from 11
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 1, // Reduced from 2
  },
  publicationDetails: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    marginBottom: 1, // Reduced from 2
  },
  // Project styles
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1, // Reduced from 3
  },
  projectTitle: {
    fontSize: 10, // Reduced from 11
    fontWeight: "bold",
    color: "#000000",
  },
  projectUrl: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
  },
  // Technologies styles
  techSection: {
    flexDirection: "row",
    marginBottom: 2, // Reduced from 5
  },
  techLabel: {
    fontSize: 10, // Reduced from 11
    fontWeight: "bold",
    color: "#000000",
    marginRight: 5,
  },
  techList: {
    fontSize: 10, // Reduced from 11
    color: "#000000",
    flex: 1,
  },
  // Entry container styles for compact spacing
  entryContainer: {
    marginBottom: 6, // Reduced from 12-15
  },
  sectionContainer: {
    marginBottom: 4, // Reduced spacing between sections
  },
});

export function ResumePDFDocument({
  resumeData,
}: {
  resumeData: ResumeDataType;
}) {
  const {
    personal_details,
    work_experience,
    skills,
    projects,
    achievements,
    education,
    publications,
    otherLists,
  } = resumeData;

  const formatDate = (date: Date | string) => {
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
  // Font.register({
  //   family: "Noto Sans Mono",
  //   src: "https://fonts.cdnfonts.com/s/29105/ARIAL.woff",
  // });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section - Centered */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal_details.name}</Text>
          {/* Contact Info Line */}
          <Text style={styles.contactLine}>
            {[
              personal_details.address
                ? `${personal_details.address.city}`
                : null,
              personal_details.email,
              personal_details.phone,
              personal_details.social_links.find((link) =>
                link.name.toLowerCase().includes("website")
              )?.url,
            ]
              .filter(Boolean)
              .join(" | ")}
          </Text>
          {/* Social Links Line */}
          <Text style={styles.contactLine}>
            {personal_details.social_links
              .filter((link) => !link.name.toLowerCase().includes("website"))
              .map((link) => link.url)
              .join(" | ")}
          </Text>
        </View>

        {/* Welcome Section */}
        {personal_details.summary?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {personal_details.summary.map((item, index) => (
                <Text key={index} style={styles.paragraph}>
                  {item.text}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience Section */}
        {work_experience?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {work_experience.map((exp, index) => (
                <View key={index} style={styles.entryContainer}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>
                      {exp.position.map((p) => p.text).join(", ")},{" "}
                      {exp.company}{" "}
                    </Text>
                    <Text style={styles.entryDate}>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.end_date ? formatDate(exp.end_date) : "Present"}
                    </Text>
                  </View>

                  {/* Highlights as bullet points */}
                  {exp.highlights?.map((highlight, highlightIndex) =>
                    highlight.text.map((text, textIndex) => (
                      <Text
                        key={`${highlightIndex}-${textIndex}`}
                        style={styles.bulletPoint}
                      >
                        • {text}
                      </Text>
                    ))
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {projects.map((project, index) => (
                <View key={index} style={styles.entryContainer}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    {project.url && (
                      <Text style={styles.projectUrl}>{project.url}</Text>
                    )}
                  </View>
                  <Text style={styles.bulletPoint}>• {project.summary}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {education.map((edu, index) => (
                <View key={index} style={styles.entryContainer}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>
                      {edu.institution},{" "}
                      {edu.degree_level.map((d) => d.text).join(" ")} in{" "}
                      {edu.field.map((f) => f.text).join(", ")}
                    </Text>
                    <Text style={styles.entryDate}>
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </Text>
                  </View>
                  {edu.score && (
                    <Text style={styles.bulletPoint}>• score {edu.score}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.entryContainer}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{achievement.title}</Text>
                    <Text style={styles.entryDate}>
                      {formatDate(achievement.date)}
                    </Text>
                  </View>
                  {achievement.awarded_by && (
                    <Text style={styles.bulletPoint}>
                      • Awarded by: {achievement.awarded_by}
                    </Text>
                  )}
                  {achievement.summary?.map((summary, summaryIndex) => (
                    <Text key={summaryIndex} style={styles.bulletPoint}>
                      • {summary.text}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Publications Section */}
        {publications?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Publications</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {publications.map((pub, index) => (
                <View key={index} style={styles.entryContainer}>
                  <Text style={styles.publicationTitle}>{pub.name}</Text>
                  <Text style={styles.publicationDetails}>
                    {formatDate(pub.releaseDate)}
                  </Text>
                  {pub.summary?.map((summary, summaryIndex) => (
                    <Text key={summaryIndex} style={styles.publicationDetails}>
                      {summary.text}
                    </Text>
                  ))}
                  <Text style={styles.publicationDetails}>{pub.url}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Technologies Section */}
        {(skills?.technical?.length > 0 || skills?.soft?.length > 0) && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.line} />
            <View
              style={{
                paddingHorizontal: 6, // Reduced padding
              }}
            >
              {skills.technical?.length > 0 && (
                <View style={styles.techSection}>
                  <Text style={styles.techLabel}>- </Text>
                  <Text style={styles.techList}>
                    {skills.technical.map((skill) => skill.name).join(", ")}
                  </Text>
                </View>
              )}

              {skills.soft?.length > 0 && (
                <View style={styles.techSection}>
                  <Text style={styles.techLabel}>- </Text>
                  <Text style={styles.techList}>
                    {skills.soft.map((skill) => skill.name).join(", ")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Additional Sections */}
        {otherLists?.length > 0 &&
          otherLists.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {section.heading.map((h) => h.text).join(" ")}
              </Text>
              {section.summary.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item.text}
                </Text>
              ))}
            </View>
          ))}
      </Page>
    </Document>
  );
}
