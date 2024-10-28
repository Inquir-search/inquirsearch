import Command from './Command';

class ExecuteSearchCommand extends Command {
    constructor(searchManager) {
        super();
        this.searchManager = searchManager;
    }

    execute() {
        return this.searchManager.executeSearch();
    }
}

export default ExecuteSearchCommand;
