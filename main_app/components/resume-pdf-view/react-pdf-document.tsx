import { ResumeDataType } from "@/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

export function ResumePDFDocument({
  resumeData,
}: {
  resumeData: ResumeDataType;
}) {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Helvetica"],
      },
      extend: {
        colors: {
          "gray-100": "#f5f5f5",
          "gray-200": "#e5e5e5",
          "gray-300": "#d0d0d0",
          "gray-400": "#f0f0f0",
          "gray-500": "#e8e8e8",
        },
      },
    },
  });
  const {
    personal_details,
    work_experience,
    education,
    skills,
    achievements,
    publications,
    projects,
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
      <Page
        size="A4"
        style={tw("flex flex-col bg-white p-5 font-sans text-xs leading-tight")}
      >
        {/* Header Section */}
        <View style={tw("mb-3 pb-2 border-b border-gray-200")}>
          <Text style={tw("text-lg font-bold text-black")}>
            {personal_details.name}
          </Text>
          {personal_details.tag_line?.map((tagLine, index) => (
            <Text
              key={index}
              style={tw("text-sm font-bold text-gray-700 mb-0.5")}
            >
              {tagLine.text}
            </Text>
          ))}
          <View style={tw("flex flex-row flex-wrap mt-1 gap-2")}>
            <Text style={tw("text-xs text-black")}>
              {" "}
              {personal_details.email}
            </Text>
            {personal_details.phone && (
              <Text style={tw("text-xs text-black")}>
                {personal_details.phone}
              </Text>
            )}
            {(personal_details.address?.city ||
              personal_details.address?.country) && (
              <Text style={tw("text-xs text-black")}>
                {personal_details.address.city},{" "}
                {personal_details.address.country}
              </Text>
            )}
          </View>
          {personal_details.social_links?.length > 0 && (
            <View style={tw("flex flex-row flex-wrap gap-1.5 mt-0.5")}>
              {personal_details.social_links.map((link, index) => (
                <Text key={index} style={tw("text-xs text-black")}>
                  {link.url}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Summary Section */}
        {personal_details.summary?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Summary
            </Text>
            {personal_details.summary.map((item, index) => (
              <Text key={index} style={tw("text-xs text-black mb-0.75")}>
                {item.text}
              </Text>
            ))}
          </View>
        )}

        {/* Work Experience Section */}
        {work_experience?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Experience
            </Text>
            {work_experience.map((exp, index) => (
              <View key={index} style={tw("mb-2")}>
                <View
                  style={tw("flex flex-row justify-between items-start mb-0.5")}
                >
                  <View>
                    {exp.position?.map((pos, posIndex) => (
                      <Text
                        key={posIndex}
                        style={tw("text-sm font-bold text-black")}
                      >
                        {pos.text}
                      </Text>
                    ))}
                    <Text style={tw("text-xs text-black mb-0.25")}>
                      {exp.company}
                    </Text>
                  </View>
                  <Text style={tw("text-xs text-black")}>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </Text>
                </View>

                {exp.summary?.map((summary, summaryIndex) => (
                  <Text
                    key={summaryIndex}
                    style={tw("text-xs text-black mb-0.5")}
                  >
                    {summary.text}
                  </Text>
                ))}

                {exp.highlights?.length > 0 && (
                  <View style={tw("mt-0.5")}>
                    {exp.highlights.map((highlight, highlightIndex) =>
                      highlight.text.map((text, textIndex) => (
                        <Text
                          key={`${highlightIndex}-${textIndex}`}
                          style={tw("text-xs text-black mb-0.25 pl-1")}
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
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Skills
            </Text>

            {skills.technical?.length > 0 && (
              <View style={tw("mb-1.5")}>
                <Text style={tw("text-xs font-bold text-black mb-0.75")}>
                  Technical Skills
                </Text>
                <View style={tw("flex flex-row flex-wrap gap-0.75")}>
                  {skills.technical.map((skill, index) => (
                    <Text
                      key={index}
                      style={tw(
                        "text-xs text-black py-0.5 px-1 mr-1 mb-0.5 border border-gray-500 rounded"
                      )}
                    >
                      {skill.name}
                      {skill.level && ` (${skill.level})`}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {skills.soft?.length > 0 && (
              <View style={tw("mb-1.5")}>
                <Text style={tw("text-xs font-bold text-black mb-0.75")}>
                  Soft Skills
                </Text>
                <View style={tw("flex flex-row flex-wrap gap-0.75")}>
                  {skills.soft.map((skill, index) => (
                    <Text
                      key={index}
                      style={tw(
                        "text-xs text-black py-0.5 px-1 mr-1 mb-0.5 border border-gray-500 rounded"
                      )}
                    >
                      {skill.name}
                      {skill.level && ` (${skill.level})`}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Projects
            </Text>
            {projects.map((project, index) => (
              <View key={index} style={tw("mb-2")}>
                <View
                  style={tw("flex flex-row justify-between items-start mb-0.5")}
                >
                  <View>
                    <Text style={tw("text-sm font-bold text-black")}>
                      {project.title}
                    </Text>
                    {project.url && (
                      <Text style={tw("text-xs text-black mb-0.25")}>
                        {project.url}
                      </Text>
                    )}
                  </View>
                  {(project.startDate || project.endDate) && (
                    <Text style={tw("text-xs text-black")}>
                      {project.startDate
                        ? formatDate(project.startDate)
                        : "N/A"}{" "}
                      -{" "}
                      {project.endDate
                        ? formatDate(project.endDate)
                        : "Present"}
                    </Text>
                  )}
                </View>

                {project.summary && (
                  <Text style={tw("text-xs text-black mb-0.75")}>
                    {project.summary}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Education
            </Text>
            {education.map((edu, index) => (
              <View key={index} style={tw("mb-1.5")}>
                <Text style={tw("text-xs font-bold text-black")}>
                  {edu.institution}
                </Text>
                {edu.degree_level?.map((degree, degreeIndex) => (
                  <Text
                    key={degreeIndex}
                    style={tw("text-xs text-black mb-0.25")}
                  >
                    {degree.text}
                    {edu.field?.length > 0 &&
                      ` in ${edu.field.map((f) => f.text).join(", ")}`}
                  </Text>
                ))}
                <Text style={tw("text-xs text-black")}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.score && ` | ${edu.score}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Achievements
            </Text>
            {achievements.map((achievement, index) => (
              <View key={index} style={tw("mb-1.5")}>
                <Text style={tw("text-xs font-bold text-black mb-0.25")}>
                  {achievement.title}
                </Text>
                <View
                  style={tw(
                    "flex flex-row justify-between items-center mb-0.5"
                  )}
                >
                  {achievement.awarded_by && (
                    <Text style={tw("text-xs text-black")}>
                      Awarded by: {achievement.awarded_by}
                    </Text>
                  )}
                  <Text style={tw("text-xs text-black")}>
                    {formatDate(achievement.date.toString())}
                  </Text>
                </View>
                {achievement.summary?.map((summary, summaryIndex) => (
                  <Text
                    key={summaryIndex}
                    style={tw("text-xs text-black mb-0.75")}
                  >
                    {summary.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Publications Section */}
        {publications?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            <Text style={tw("text-sm font-bold text-black mb-1 uppercase")}>
              Publications
            </Text>
            {publications.map((pub, index) => (
              <View key={index} style={tw("mb-1.5")}>
                <Text style={tw("text-xs font-bold text-black mb-0.25")}>
                  {pub.name}
                </Text>
                <Text style={tw("text-xs text-black mb-0.5")}>
                  {pub.publisher} | {formatDate(pub.releaseDate.toString())}
                </Text>
                {pub.url && (
                  <Text style={tw("text-xs text-black")}>{pub.url}</Text>
                )}
                {pub.summary?.map((summary, summaryIndex) => (
                  <Text
                    key={summaryIndex}
                    style={tw("text-xs text-black mb-0.75")}
                  >
                    {summary.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Other Lists Section */}
        {otherLists?.length > 0 && (
          <View style={tw("mb-2.5 pb-2 border-b border-gray-300")}>
            {otherLists.map((list, index) => (
              <View key={index} style={tw("mb-1.5")}>
                {list.heading?.map((heading, headingIndex) => (
                  <Text
                    key={headingIndex}
                    style={tw("text-sm font-bold text-black mb-1 uppercase")}
                  >
                    {heading.text}
                  </Text>
                ))}
                {list.summary?.map((summary, summaryIndex) => (
                  <Text
                    key={summaryIndex}
                    style={tw("text-xs text-black mb-0.75")}
                  >
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
