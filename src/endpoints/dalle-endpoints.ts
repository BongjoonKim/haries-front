import request from "../services/request-response-service";

export async function askDalle(props : {
  channelId ?: string;
  question ?: string;
}) {
  return (await request.post("/"))
}