import {
  Box,
  Button,
  Image,
  NativeImage,
  NativeTable,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@yamada-ui/react";
import { Select, Option } from "@yamada-ui/react";

import "./App.css";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "X-Auth-Token": import.meta.env.VITE_API_KEY },
    })
    .then((res) => res.data);
// .then((res) => console.log(res.data));

function App() {
  const [displayTeams, setDisplayTeams] = useState("");

  const { data, error, isLoading } = useSWR("/api/v4/competitions/PL/teams", fetcher);

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  if (isLoading) return <div>loading...</div>;

  const onclickTeamButton = (teamName: string) => {
    console.log(teamName);
    setDisplayTeams(teamName);
  };

  return (
    <>
      <Box w="4xl" mx="auto" py="10">
        <Select placeholder="チームを選択">
          {data.teams.map((team) => {
            return (
              <>
                <Option
                  value={team.name}
                  key={team.id}
                  onClick={() => onclickTeamButton(team.name)}
                >
                  {team.name}
                </Option>
              </>
            );
          })}
        </Select>
        {data.teams.map((team) => {
          return (
            <Box key={team.id}>
              {team.name === displayTeams && (
                <Box>
                  <Box>{team.name}</Box>
                  <Box>{team.coach.name}</Box>
                  <Box>
                    <Image src={team.crest} boxSize="2xs" />
                  </Box>
                  <Box>
                    <TableContainer>
                      <NativeTable>
                        <Thead>
                          <Tr>
                            <Th>選手名</Th>
                            <Th>ポジション</Th>
                            <Th numeric>国</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {team.squad.map((player) => {
                            return (
                              <Tr>
                                <Td>{player.name}</Td>
                                <Td>{player.position}</Td>
                                <Td numeric>{player.nationality}</Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </NativeTable>
                    </TableContainer>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default App;
