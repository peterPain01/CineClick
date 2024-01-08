import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
function Loading({ loading = true }) {
    return (
        <div id="loader-container" >
            <div className="sweet-loading" style={style}>
                <ClipLoader
                    css={override}
                    size={150}
                    color={"red"}
                    loading={loading}
                />
            </div>
        </div>
    );
}
export default Loading;
