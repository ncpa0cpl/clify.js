"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Argument: () => import_argument.Argument,
  DataType: () => import_dilswer.DataType,
  ExitError: () => import_errors.ExitError,
  InputFileArg: () => import_input_file_arg.InputFileArg,
  InputFileHandleArg: () => import_input_file_arg.InputFileHandleArg,
  MainCommand: () => import_main_command.MainCommand,
  Out: () => import_output.Out,
  StdInput: () => import_stdinput.StdInput,
  Type: () => import_dilswer.Type,
  configure: () => configure,
  default: () => src_default,
  html: () => import_termx_markup.html
});
module.exports = __toCommonJS(src_exports);
var import_dilswer = require("dilswer");
var import_termx_markup = require("termx-markup");
var import_argument = require("./Arguments/argument.cjs");
var import_input_file_arg = require("./Arguments/input-file-arg.cjs");
var import_main_command = require("./Commands/main-command.cjs");
var import_errors = require("./Utils/errors.cjs");
var import_output = require("./output.cjs");
var import_stdinput = require("./stdinput.cjs");
var DEBUG = process.env.DEBUG === "true";
async function configure(initialize) {
  try {
    const mainCommand = new import_main_command.MainCommand();
    await initialize(mainCommand);
    await mainCommand.start();
  } catch (e) {
    if (e instanceof import_errors.ClifyError) {
      if (DEBUG) {
        import_output.Out.debug(import_termx_markup.html`<pre>${String(e.stack)}</pre>`);
      }
      process.exit(1);
    }
    import_output.Out.err(import_termx_markup.html`
      <span bold color="lightRed">
        An error occurred when running this script.
      </span>
    `);
    if (e instanceof Error) {
      import_output.Out.err(import_termx_markup.html` <pad size="2" color="red"> ${e.message} </pad> `);
      if (DEBUG) {
        import_output.Out.debug(import_termx_markup.html`<pre>${String(e.stack)}</pre>`);
      }
    }
    if (e instanceof import_errors.ExitError) {
      process.exit(e.code);
    }
    process.exit(1);
  }
}
var src_default = {
  Argument: import_argument.Argument,
  DataType: import_dilswer.DataType,
  ExitError: import_errors.ExitError,
  InputFileArg: import_input_file_arg.InputFileArg,
  InputFileHandleArg: import_input_file_arg.InputFileHandleArg,
  MainCommand: import_main_command.MainCommand,
  Out: import_output.Out,
  StdInput: import_stdinput.StdInput,
  Type: import_dilswer.Type,
  configure,
  html: import_termx_markup.html
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBEYXRhVHlwZSwgVHlwZSB9IGZyb20gXCJkaWxzd2VyXCI7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcInRlcm14LW1hcmt1cFwiO1xuaW1wb3J0IHsgQXJndW1lbnQgfSBmcm9tIFwiLi9Bcmd1bWVudHMvYXJndW1lbnRcIjtcbmltcG9ydCB7XG4gIElucHV0RmlsZUFyZyxcbiAgSW5wdXRGaWxlSGFuZGxlQXJnLFxufSBmcm9tIFwiLi9Bcmd1bWVudHMvaW5wdXQtZmlsZS1hcmdcIjtcbmltcG9ydCB7IE1haW5Db21tYW5kIH0gZnJvbSBcIi4vQ29tbWFuZHMvbWFpbi1jb21tYW5kXCI7XG5pbXBvcnQgeyBDbGlmeUVycm9yLCBFeGl0RXJyb3IgfSBmcm9tIFwiLi9VdGlscy9lcnJvcnNcIjtcbmltcG9ydCB7IE91dCB9IGZyb20gXCIuL291dHB1dFwiO1xuaW1wb3J0IHsgU3RkSW5wdXQgfSBmcm9tIFwiLi9zdGRpbnB1dFwiO1xuXG5jb25zdCBERUJVRyA9IHByb2Nlc3MuZW52LkRFQlVHID09PSBcInRydWVcIjtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYW5kIGNvbmZpZ3VyZXMgdGhlIHNjcmlwdC4gVGhpcyBtZXRob2QgdGFrZXMgb25lXG4gKiBhcmd1bWVudCwgYW4gaW5pdGlhdGlvbiBjYWxsYmFjay5cbiAqXG4gKiBAZXhhbXBsZVxuICogICBjb25maWd1cmUoKG1haW5Db21tYW5kKSA9PiB7XG4gKiAgICAgbWFpbkNvbW1hbmQuc2V0TmFtZShcIm15LXNjcmlwdFwiKTtcbiAqICAgICBtYWluQ29tbWFuZC5zZXRNYWluQWN0aW9uKCgpID0+IHtcbiAqICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgIHJ1bigpIHtcbiAqICAgICAgICAgICAvLyBIZXJlIGdvZXMgdGhlIG1haW4gY29tbWFuZCBpbXBsZW1lbnRhdGlvblxuICogICAgICAgICB9LFxuICogICAgICAgfTtcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgbWFpbkNvbW1hbmQuYWRkU3ViQ29tbWFuZChcInN1Yi1jb21tYW5kXCIsICgpID0+IHtcbiAqICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgIHJ1bigpIHtcbiAqICAgICAgICAgICAvLyBIZXJlIGdvZXMgdGhlIHN1Yi1jb21tYW5kIGltcGxlbWVudGF0aW9uXG4gKiAgICAgICAgIH0sXG4gKiAgICAgICB9O1xuICogICAgIH0pO1xuICogICB9KTtcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlKFxuICBpbml0aWFsaXplOiAobWFpbkNvbW1hbmQ6IE1haW5Db21tYW5kKSA9PiB2b2lkLFxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWFpbkNvbW1hbmQgPSBuZXcgTWFpbkNvbW1hbmQoKTtcbiAgICBhd2FpdCBpbml0aWFsaXplKG1haW5Db21tYW5kKTtcbiAgICBhd2FpdCBtYWluQ29tbWFuZC5zdGFydCgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBDbGlmeUVycm9yKSB7XG4gICAgICBpZiAoREVCVUcpIHtcbiAgICAgICAgT3V0LmRlYnVnKGh0bWxgPHByZT4ke1N0cmluZyhlLnN0YWNrKX08L3ByZT5gKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG5cbiAgICBPdXQuZXJyKGh0bWxgXG4gICAgICA8c3BhbiBib2xkIGNvbG9yPVwibGlnaHRSZWRcIj5cbiAgICAgICAgQW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBydW5uaW5nIHRoaXMgc2NyaXB0LlxuICAgICAgPC9zcGFuPlxuICAgIGApO1xuXG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgT3V0LmVycihodG1sYCA8cGFkIHNpemU9XCIyXCIgY29sb3I9XCJyZWRcIj4gJHtlLm1lc3NhZ2V9IDwvcGFkPiBgKTtcblxuICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgIE91dC5kZWJ1ZyhodG1sYDxwcmU+JHtTdHJpbmcoZS5zdGFjayl9PC9wcmU+YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFeGl0RXJyb3IpIHtcbiAgICAgIHByb2Nlc3MuZXhpdChlLmNvZGUpO1xuICAgIH1cblxuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcmd1bWVudCxcbiAgRGF0YVR5cGUsXG4gIEV4aXRFcnJvcixcbiAgSW5wdXRGaWxlQXJnLFxuICBJbnB1dEZpbGVIYW5kbGVBcmcsXG4gIE1haW5Db21tYW5kLFxuICBPdXQsXG4gIFN0ZElucHV0LFxuICBUeXBlLFxuICBjb25maWd1cmUsXG4gIGh0bWwsXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICBBcmd1bWVudCxcbiAgRGF0YVR5cGUsXG4gIEV4aXRFcnJvcixcbiAgSW5wdXRGaWxlQXJnLFxuICBJbnB1dEZpbGVIYW5kbGVBcmcsXG4gIE1haW5Db21tYW5kLFxuICBPdXQsXG4gIFN0ZElucHV0LFxuICBUeXBlLFxuICBjb25maWd1cmUsXG4gIGh0bWwsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErQjtBQUMvQiwwQkFBcUI7QUFDckIsc0JBQXlCO0FBQ3pCLDRCQUdPO0FBQ1AsMEJBQTRCO0FBQzVCLG9CQUFzQztBQUN0QyxvQkFBb0I7QUFDcEIsc0JBQXlCO0FBRXpCLElBQU0sUUFBUSxRQUFRLElBQUksVUFBVTtBQTBCcEMsZUFBZSxVQUNiLFlBQ0E7QUFDQSxNQUFJO0FBQ0YsVUFBTSxjQUFjLElBQUksZ0NBQVk7QUFDcEMsVUFBTSxXQUFXLFdBQVc7QUFDNUIsVUFBTSxZQUFZLE1BQU07QUFBQSxFQUMxQixTQUFTLEdBQUc7QUFDVixRQUFJLGFBQWEsMEJBQVk7QUFDM0IsVUFBSSxPQUFPO0FBQ1QsMEJBQUksTUFBTSxnQ0FBWSxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFBQSxNQUMvQztBQUNBLGNBQVEsS0FBSyxDQUFDO0FBQUEsSUFDaEI7QUFFQSxzQkFBSSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FJUDtBQUVELFFBQUksYUFBYSxPQUFPO0FBQ3RCLHdCQUFJLElBQUksdURBQW1DLEVBQUUsT0FBTyxVQUFVO0FBRTlELFVBQUksT0FBTztBQUNULDBCQUFJLE1BQU0sZ0NBQVksT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBRUEsUUFBSSxhQUFhLHlCQUFXO0FBQzFCLGNBQVEsS0FBSyxFQUFFLElBQUk7QUFBQSxJQUNyQjtBQUVBLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFDRjtBQWVBLElBQU8sY0FBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
