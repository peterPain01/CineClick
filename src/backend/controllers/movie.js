const path = require("path");
const fs = require("fs");
const spawn = require("child_process").spawn;
const MovieModel = require("../models/Movie");
module.exports = {
    async add(movie_info, raw_file_path) {
        const SEC_PER_PART = 20;
        movie_info.id = await MovieModel.get_next_id();
        const mv_path = movie_info.get_file();
        if (raw_file_path === undefined || raw_file_path === null) { // only upload info without file, manually add video later
            await MovieModel.add(movie_info);
            return;
        }
        if (fs.existsSync(MovieModel.get_folder(movie_info.id))){
            throw new Error("Movie id already exist");
        } else {
            fs.mkdirSync(MovieModel.get_folder(movie_info.id), {recursive: true});
            let proc = spawn("ffmpeg", ["-i",
                raw_file_path,
                "-c:v", "libx264", "-c:a", "aac", "-strict", "-2",
                "-hls_time", SEC_PER_PART.toString(), "-f", "hls", "-hls_list_size", "0",
                mv_path]);
            proc.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            proc.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            proc.on("close", async (code) => {
                console.log(`Child exit with code ${code}`);
                if (code == 0) {
                    await MovieModel.add(movie_info);
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
    }
}
