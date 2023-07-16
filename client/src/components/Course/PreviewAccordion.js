import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import QuizIcon from "@mui/icons-material/Quiz";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";

export const PreviewAccordion = ({ subtitles }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {subtitles?.map((subtitle, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ backgroundColor: "#EBF1F2" }}
            >
              <Typography sx={{ flex: 2, width: "33%", flexShrink: 0 }}>
                {subtitle?.title}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {subtitle?.hours?.toFixed(2)}hr
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {subtitle?.videos?.map((video, ind) => (
                  <li>
                    <Stack direction={"row"} spacing={0.5}>
                      <PlayCircleFilledIcon />
                      <Typography>{video?.title}</Typography>
                    </Stack>
                  </li>
                ))}
                <Divider />
                {subtitle?.exercises?.map((exercise, ind) => (
                  <li>
                    <Stack direction={"row"} spacing={0.5}>
                      <QuizIcon />
                      <Typography>{exercise?.title}</Typography>
                    </Stack>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
