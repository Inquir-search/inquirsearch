import Command from './Command';

class UpdateQueryCommand extends Command {
    constructor(searchManager, query) {
        super();
        this.searchManager = searchManager;
        this.query = query;
    }

    execute() {
        return this.searchManager.updateQuery(this.query);
    }
}

export default UpdateQueryCommand;
