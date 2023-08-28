// src/index.ts
import { DataType, Type } from "dilswer";
import { html } from "termx-markup";
import { Argument } from "./Arguments/argument.mjs";
import {
  InputFileArg,
  InputFileHandleArg
} from "./Arguments/input-file-arg.mjs";
import { MainCommand } from "./Commands/main-command.mjs";
import { ClifyError, ExitError } from "./Utils/errors.mjs";
import { Out } from "./output.mjs";
import { StdInput } from "./stdinput.mjs";
var DEBUG = process.env.DEBUG === "true";
async function configure(initialize) {
  try {
    const mainCommand = new MainCommand();
    await initialize(mainCommand);
    await mainCommand.start();
  } catch (e) {
    if (e instanceof ClifyError) {
      if (DEBUG) {
        Out.debug(html`<pre>${String(e.stack)}</pre>`);
      }
      process.exit(1);
    }
    Out.err(html`
      <span bold color="lightRed">
        An error occurred when running this script.
      </span>
    `);
    if (e instanceof Error) {
      Out.err(html` <pad size="2" color="red"> ${e.message} </pad> `);
      if (DEBUG) {
        Out.debug(html`<pre>${String(e.stack)}</pre>`);
      }
    }
    if (e instanceof ExitError) {
      process.exit(e.code);
    }
    process.exit(1);
  }
}
var src_default = {
  Argument,
  DataType,
  ExitError,
  InputFileArg,
  InputFileHandleArg,
  MainCommand,
  Out,
  StdInput,
  Type,
  configure,
  html
};
export {
  Argument,
  DataType,
  ExitError,
  InputFileArg,
  InputFileHandleArg,
  MainCommand,
  Out,
  StdInput,
  Type,
  configure,
  src_default as default,
  html
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBEYXRhVHlwZSwgVHlwZSB9IGZyb20gXCJkaWxzd2VyXCI7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuaW1wb3J0IHsgQXJndW1lbnQgfSBmcm9tIFwiLi9Bcmd1bWVudHMvYXJndW1lbnRcIjtcbmltcG9ydCB7XG4gIElucHV0RmlsZUFyZyxcbiAgSW5wdXRGaWxlSGFuZGxlQXJnLFxufSBmcm9tIFwiLi9Bcmd1bWVudHMvaW5wdXQtZmlsZS1hcmdcIjtcbmltcG9ydCB7IE1haW5Db21tYW5kIH0gZnJvbSBcIi4vQ29tbWFuZHMvbWFpbi1jb21tYW5kXCI7XG5pbXBvcnQgeyBDbGlmeUVycm9yLCBFeGl0RXJyb3IgfSBmcm9tIFwiLi9VdGlscy9lcnJvcnNcIjtcbmltcG9ydCB7IE91dCB9IGZyb20gXCIuL291dHB1dFwiO1xuaW1wb3J0IHsgU3RkSW5wdXQgfSBmcm9tIFwiLi9zdGRpbnB1dFwiO1xuXG5jb25zdCBERUJVRyA9IHByb2Nlc3MuZW52LkRFQlVHID09PSBcInRydWVcIjtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYW5kIGNvbmZpZ3VyZXMgdGhlIHNjcmlwdC4gVGhpcyBtZXRob2QgdGFrZXMgb25lXG4gKiBhcmd1bWVudCwgYW4gaW5pdGlhdGlvbiBjYWxsYmFjay5cbiAqXG4gKiBAZXhhbXBsZVxuICogICBjb25maWd1cmUoKG1haW5Db21tYW5kKSA9PiB7XG4gKiAgICAgbWFpbkNvbW1hbmQuc2V0TmFtZShcIm15LXNjcmlwdFwiKTtcbiAqICAgICBtYWluQ29tbWFuZC5zZXRNYWluQWN0aW9uKCgpID0+IHtcbiAqICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgIHJ1bigpIHtcbiAqICAgICAgICAgICAvLyBIZXJlIGdvZXMgdGhlIG1haW4gY29tbWFuZCBpbXBsZW1lbnRhdGlvblxuICogICAgICAgICB9LFxuICogICAgICAgfTtcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgbWFpbkNvbW1hbmQuYWRkU3ViQ29tbWFuZChcInN1Yi1jb21tYW5kXCIsICgpID0+IHtcbiAqICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgIHJ1bigpIHtcbiAqICAgICAgICAgICAvLyBIZXJlIGdvZXMgdGhlIHN1Yi1jb21tYW5kIGltcGxlbWVudGF0aW9uXG4gKiAgICAgICAgIH0sXG4gKiAgICAgICB9O1xuICogICAgIH0pO1xuICogICB9KTtcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlKFxuICBpbml0aWFsaXplOiAobWFpbkNvbW1hbmQ6IE1haW5Db21tYW5kKSA9PiB2b2lkLFxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWFpbkNvbW1hbmQgPSBuZXcgTWFpbkNvbW1hbmQoKTtcbiAgICBhd2FpdCBpbml0aWFsaXplKG1haW5Db21tYW5kKTtcbiAgICBhd2FpdCBtYWluQ29tbWFuZC5zdGFydCgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBDbGlmeUVycm9yKSB7XG4gICAgICBpZiAoREVCVUcpIHtcbiAgICAgICAgT3V0LmRlYnVnKGh0bWxgPHByZT4ke1N0cmluZyhlLnN0YWNrKX08L3ByZT5gKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG5cbiAgICBPdXQuZXJyKGh0bWxgXG4gICAgICA8c3BhbiBib2xkIGNvbG9yPVwibGlnaHRSZWRcIj5cbiAgICAgICAgQW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBydW5uaW5nIHRoaXMgc2NyaXB0LlxuICAgICAgPC9zcGFuPlxuICAgIGApO1xuXG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgT3V0LmVycihodG1sYCA8cGFkIHNpemU9XCIyXCIgY29sb3I9XCJyZWRcIj4gJHtlLm1lc3NhZ2V9IDwvcGFkPiBgKTtcblxuICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgIE91dC5kZWJ1ZyhodG1sYDxwcmU+JHtTdHJpbmcoZS5zdGFjayl9PC9wcmU+YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFeGl0RXJyb3IpIHtcbiAgICAgIHByb2Nlc3MuZXhpdChlLmNvZGUpO1xuICAgIH1cblxuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcmd1bWVudCxcbiAgRGF0YVR5cGUsXG4gIEV4aXRFcnJvcixcbiAgSW5wdXRGaWxlQXJnLFxuICBJbnB1dEZpbGVIYW5kbGVBcmcsXG4gIE1haW5Db21tYW5kLFxuICBPdXQsXG4gIFN0ZElucHV0LFxuICBUeXBlLFxuICBjb25maWd1cmUsXG4gIGh0bWwsXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICBBcmd1bWVudCxcbiAgRGF0YVR5cGUsXG4gIEV4aXRFcnJvcixcbiAgSW5wdXRGaWxlQXJnLFxuICBJbnB1dEZpbGVIYW5kbGVBcmcsXG4gIE1haW5Db21tYW5kLFxuICBPdXQsXG4gIFN0ZElucHV0LFxuICBUeXBlLFxuICBjb25maWd1cmUsXG4gIGh0bWwsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsVUFBVSxZQUFZO0FBQy9CLFNBQVMsWUFBWTtBQUNyQixTQUFTLGdCQUFnQjtBQUN6QjtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsWUFBWSxpQkFBaUI7QUFDdEMsU0FBUyxXQUFXO0FBQ3BCLFNBQVMsZ0JBQWdCO0FBRXpCLElBQU0sUUFBUSxRQUFRLElBQUksVUFBVTtBQTBCcEMsZUFBZSxVQUNiLFlBQ0E7QUFDQSxNQUFJO0FBQ0YsVUFBTSxjQUFjLElBQUksWUFBWTtBQUNwQyxVQUFNLFdBQVcsV0FBVztBQUM1QixVQUFNLFlBQVksTUFBTTtBQUFBLEVBQzFCLFNBQVMsR0FBRztBQUNWLFFBQUksYUFBYSxZQUFZO0FBQzNCLFVBQUksT0FBTztBQUNULFlBQUksTUFBTSxZQUFZLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUTtBQUFBLE1BQy9DO0FBQ0EsY0FBUSxLQUFLLENBQUM7QUFBQSxJQUNoQjtBQUVBLFFBQUksSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSVA7QUFFRCxRQUFJLGFBQWEsT0FBTztBQUN0QixVQUFJLElBQUksbUNBQW1DLEVBQUUsT0FBTyxVQUFVO0FBRTlELFVBQUksT0FBTztBQUNULFlBQUksTUFBTSxZQUFZLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUTtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUVBLFFBQUksYUFBYSxXQUFXO0FBQzFCLGNBQVEsS0FBSyxFQUFFLElBQUk7QUFBQSxJQUNyQjtBQUVBLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFDRjtBQWVBLElBQU8sY0FBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
