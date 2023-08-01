export const fontWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
};

export const color = {
    black: "#000",
    white: "#fff",

    dark: "#333",
    darkGray: "#707070",
    lightGray: "#b9b9b9",
    light: "#DEDEDE",

    primary: "rgb(19, 102, 255)",
    secondary: "#B37A00",

    success: "#3e8e41",
    error: "#ff6b6b",

    bg: "#f5f6f6",
    modalBg: "rgba(0, 0, 0, 0.81)",
};

export const boxShadow = {
    style1: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    style2: "0px 4px 12px 3px rgba(0, 0, 0, 0.25)",
    style3: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
};

export const layout = {
    flexBox: (
        direction = "row",
        justifyContent = "flex-start",
        alignItems = "flex-start"
    ) => `
		display: flex;
		flex-direction: ${direction};
		justify-content: ${justifyContent};
		align-items: ${alignItems};
	`,

    gridBox: (direction = "row", size: string) => `
		display: grid;
		${
            direction === "row"
                ? `grid-template-rows: repeat( auto-fill, ${size} );`
                : `grid-template-columns: repeat( auto-fill, ${size} );`
        }
	`,
};

export const zIndex = {
    background: -1,
    navbar: 900,
    footer: 998,
    logo: 901,
    modal: 999,
};

export const widths = {
    xxs: "480px",
    xs: "600px",
    sm: "768px",
    md: "900px",
    lg: "1024px",
    xl: "1280px",

    logo: "3rem",
};

export const heights = {
    navbar: "7rem",
    footer: "9rem",
};

export const breakpoint = {
    xs: `screen and (max-width: ${widths.xs})`,
    sm: `screen and (max-width: ${widths.sm})`,
    md: `screen and (max-width: ${widths.md})`,
    lg: `screen and (max-width: ${widths.lg})`,
    xl: `screen and (max-width: ${widths.xl})`,
};
