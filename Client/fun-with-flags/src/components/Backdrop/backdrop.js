const backdrop = (props) => {
    let backdrop = (
        <div style={{
            position: "absolute",
            zIndex: "1079",
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,0.5)"
        }}
            onClick={props.onBackdropClick}
        >

        </div>
    )

    return props.show ? backdrop : null;
}

export default backdrop;