const path = require("path");
const fs = require("fs");
const spawn = require("child_process").spawn;
const MovieModel = require("../models/Movie");
const { AccountInfo } = require("../models/Account");
module.exports = {
    async add(movie_info, genres, raw_video_path, raw_image_path) {
        const SEC_PER_PART = 20;
        movie_info.id = await MovieModel.get_next_id();
        console.log(movie_info.id);
        const mv_path = MovieModel.get_file(movie_info.id);
        if (raw_image_path !== undefined) {
            fs.mkdirSync(path.join("resources", "images"), {recursive: true});
            movie_info.image = "http://localhost:13123/resources/images/" + movie_info.id;
            fs.copyFileSync(raw_image_path, path.join("resources", "images", movie_info.id.toString()));
            fs.rmSync(raw_image_path);
        }
        if (raw_video_path === undefined || raw_video_path === null) { // only upload info without file, manually add video later
            await MovieModel.add(movie_info);
            return;
        }
        if (fs.existsSync(MovieModel.get_folder(movie_info.id))){
            throw new Error("Movie id already exist");
        } else {
            fs.mkdirSync(MovieModel.get_folder(movie_info.id), {recursive: true});
            let proc = spawn("ffmpeg", ["-i",
                raw_video_path,
                "-c:v", "libx264", "-c:a", "aac", "-strict", "-2",
                "-hls_time", SEC_PER_PART.toString(), "-f", "hls", "-hls_list_size", "0",
                mv_path]);
            // proc.stdout.on('data', (data) => {
            //     console.log(`stdout: ${data}`);
            // });
            // proc.stderr.on('data', (data) => {
            //     console.error(`stderr: ${data}`);
            // });
            proc.on("close", async (code) => {
                console.log(`Child exit with code ${code}`);
                if (code == 0) {
                    await MovieModel.add(movie_info, genres);
                    fs.rmSync(raw_video_path);
                }
            });
        }
    },
    async stream(video_path, res) {
        const headers = {
            "Content-Type": "application/x-mpegURL",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(video_path);
        videoStream.pipe(res);
    },
    async can_watch(account, mv_id) {
        if (!mv_id && !email) {
            throw new Error("'ID' and 'email' are required");
        }
        if (!(account instanceof AccountInfo)) {
            throw new Error("Invalid type for account");
        }
        if (account.type === "admin") return true;
        const mv_info = await MovieModel.get(mv_id);
        if (mv_info.type === "free") {
            return true;
        } else if (mv_info.type === "premium") {
            return account.type === "premium-viewer";
        } else {
            throw new Error(`Unregconized type ${mv_info.type}`);
        }
    }
}
