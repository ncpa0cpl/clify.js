// src/Utils/errors.ts
var ClifyError = class extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ClifyError";
  }
};
var InitError = class extends ClifyError {
  constructor() {
    super("Script Initialization Error");
    this.name = "InitError";
  }
};
var ExitError = class extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
    this.name = "ExitError";
  }
};
export {
  ClifyError,
  ExitError,
  InitError
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1V0aWxzL2Vycm9ycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNsYXNzIENsaWZ5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNsaWZ5RXJyb3JcIjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5pdEVycm9yIGV4dGVuZHMgQ2xpZnlFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwiU2NyaXB0IEluaXRpYWxpemF0aW9uIEVycm9yXCIpO1xuICAgIHRoaXMubmFtZSA9IFwiSW5pdEVycm9yXCI7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4aXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IGNvZGU6IG51bWJlcixcbiAgICBtc2c6IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLm5hbWUgPSBcIkV4aXRFcnJvclwiO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQU8sSUFBTSxhQUFOLGNBQXlCLE1BQU07QUFBQSxFQUNwQyxZQUFZLEtBQWE7QUFDdkIsVUFBTSxHQUFHO0FBQ1QsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGO0FBRU8sSUFBTSxZQUFOLGNBQXdCLFdBQVc7QUFBQSxFQUN4QyxjQUFjO0FBQ1osVUFBTSw2QkFBNkI7QUFDbkMsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGO0FBRU8sSUFBTSxZQUFOLGNBQXdCLE1BQU07QUFBQSxFQUNuQyxZQUNrQixNQUNoQixLQUNBO0FBQ0EsVUFBTSxHQUFHO0FBSE87QUFJaEIsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
