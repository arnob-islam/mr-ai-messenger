import React from "react";
import { Container, Box } from "@mui/material";

const Sections = () => {
  const sectionContent: { title: string; bg: string }[] = [
    {
      title: "Banner",
      bg: "linear-gradient(to right bottom, #9534e0, #a82ddd, #b923d9, #c917d4, #d800cf)",
    },
    {
      title: "some content",
      bg: "linear-gradient(to left bottom, #4c78bb, #00a2da, #00c8cd, #34e69d, #cbf868)",
    },
    {
      title: "some content",
      bg: "linear-gradient(to left bottom, #152742, #303059, #56346a, #7f3471, #a8316c)",
    },
    {
      title: "some content",
      bg: "linear-gradient(to left bottom, #e34a86, #cb3990, #ab2f9a, #832ea3, #4b31a8)",
    },
    {
      title: "some content",
      bg: "linear-gradient(to right bottom, #e03477, #b23382, #803680, #4e3473, #1f2c5c)",
    },
  ];

  return (
    <>
      {sectionContent.map(({ title, bg }: { title: string; bg: string }, i) => {
        return (
          <section key={i} style={{ background: bg }} className="__section_bg">
            <Container>
              <Box className="flex ai-c jc-c">
                <h1>{title}</h1>
              </Box>
            </Container>
          </section>
        );
      })}
    </>
  );
};

export default Sections;
