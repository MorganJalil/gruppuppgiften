class Animals {

    constructor(type, collection, app) {
      this.type = type;
      this.collection = collection;
      this.app = app;
    }
  
    // Setup the routes in class
    registerAnimal() {
      const path = `/${this.type}`;
      
      this.app.post(path, (req, res) => {
        if (!req.body.name) {
          console.log(req.body);
          return res.status(400).send({
            success: false,
            message: 'Name is required for ' + `/${this.type}`,
          });
        }
        const animal = req.body;
        const newId = this.collection.push(animal);
        return res.status(201).send({
          success: true,
          message: `/${this.type}` + ' added successfully',
          id: newId,
        });
      });
    }
  
    getAllAnimals() {
      const path = `/${this.type}s`;
    
      this.app.get(path, (req, res) => res.status(200).send({
        success: true,
        data: db[`${this.type}s`].all()
      }));
    }
  
    getAnimalId() {
      const path = `/${this.type}/:id`;
  
      this.app.get(path, (req, res) => {
        const id = +req.params.id;
        const idResult = db[`${this.type}s`].all().find(obj => obj.id === id);
        if (idResult) {
          return res.status(200).send({
            success: true,
            data: idResult,
          });
        }
        return res.status(404).send({
          success: false,
          message: `${this.type} could not be found`,
  
        });
      });
    }
  
    getAnimalSearch() {
      const path = `/${this.type}s/:key/:value`;
  
      this.app.get(path, (req, res) => {
        const { key, value } = req.params;
        const animalResult = db[`${this.type}s`].find({ [key]: value });
        if (animalResult) {
          return res.status(200).send({
            success: true,
            data: animalResult,
          });
        }
        return res.status(404).send({
          success: false,
          message: `could not find ${this.type}s`,
        });
      });
    }
  }

  export default Animals;