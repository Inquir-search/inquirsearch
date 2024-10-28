class CommandDispatcher {
    constructor() {
        this.commands = [];
    }

    register(command) {
        this.commands.push(command);
    }

    dispatch(command) {
        return command.execute();
    }
}

export default CommandDispatcher;
