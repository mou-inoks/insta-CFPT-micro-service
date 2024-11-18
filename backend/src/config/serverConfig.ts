import path from "path";

export const serverConfig = {
    uploadDirectory: path.join(__dirname, "../../uploads"),
    port: process.env.PORT || 3000,
};