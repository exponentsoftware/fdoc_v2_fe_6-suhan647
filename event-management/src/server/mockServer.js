import { createServer, Model, RestSerializer } from 'miragejs';

export function makeServer() {
  const server = createServer({
    models: {
      event: Model, 
    },

    serializers: {
      application: RestSerializer, 
    },

    routes() {
      this.namespace = '/api'; 

      // GET /api/events
      this.get('/events', (schema) => {
        return schema.events.all();
      });

      // GET /api/events/:id
      this.get('/events/:id', (schema, request) => {
        const id = request.params.id;
        return schema.events.find(id);
      });

      // POST /api/events
      this.post('/events', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.events.create(attrs);
      });

      // PUT /api/events/:id
      this.put('/events/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const event = schema.events.find(id);
        return event.update(attrs);
      });

      // DELETE /api/events/:id
      this.delete('/events/:id', (schema, request) => {
        const id = request.params.id;
        return schema.events.find(id).destroy();
      });
    },

    seeds(server) {
      server.db.loadData({
        events: [
            {
                "id": 1,
                "title": "Event 1",
                "date": "2023-05-20",
                "time": "15:00",
                "location": "Venue 1",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra" 
              },
              {
                "id": 2,
                "title": "Event 2",
                "date": "2023-05-22",
                "time": "18:30",
                "location": "Venue 2",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra" 
              },
              // {
              //   "id": 3,
              //   "title": "Event 3",
              //   "date": "2023-05-25",
              //   "time": "09:00",
              //   "location": "Venue 3",
              //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra" 
              // },
              // {
              //   "id": 4,
              //   "title": "Event 4",
              //   "date": "2023-05-22",
              //   "time": "18:30",
              //   "location": "Venue 4",
              //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra" 
              // }
        ],
      });
    },
  });

  return server;
}
