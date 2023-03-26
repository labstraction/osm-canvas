class Controller {

    constructor() {
        this.isUpClicked = false;
        this.isDownClicked = false;
        this.isRightClicked = false;
        this.isLeftClicked = false;
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        if (event.key === "ArrowUp") {
            this.isUpClicked = true;
        }
        if (event.key === "ArrowDown") {
            this.isDownClicked = true;
        }
        if (event.key === "ArrowRight") {
            this.isRightClicked = true;
        }
        if (event.key === "ArrowLeft") {
            this.isLeftClicked = true;
        }

    }

    onKeyUp(event) {
        if (event.key === "ArrowUp") {
            this.isUpClicked = false;
        }
        if (event.key === "ArrowDown") {
            this.isDownClicked = false;
        }
        if (event.key === "ArrowRight") {
            this.isRightClicked = false;
        }
        if (event.key === "ArrowLeft") {
            this.isLeftClicked = false;
        }
    }
}