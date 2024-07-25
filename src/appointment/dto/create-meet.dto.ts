export class CreateMeetDto {
  host: string;
  code: string;
  name: string;
  url: string;
  artifact: { transcription: string; record: string };
}
