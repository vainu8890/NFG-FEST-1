const { v4: uuidv4 } = require('uuid');
function Task(status="backlog",description,isActive = true, isDeleted = false) {
    this.id = uuidv4(); 
    this.status = status;
    this.description= description;
    this.is_active = isActive;
    this.is_deleted = isDeleted
    return this;
}
module.exports = Task;