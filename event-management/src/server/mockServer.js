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
                "title": "Example Event 1",
                "date": "2023-05-20",
                "time": "15:00",
                "location": "Example Venue 1",
                "description": "This is an example event description."
              },
              {
                "id": 2,
                "title": "Example Event 2",
                "date": "2023-05-22",
                "time": "18:30",
                "location": "Example Venue 2",
                "description": "This is another example event description."
              },
              {
                "id": 3,
                "title": "Example Event 3",
                "date": "2023-05-25",
                "time": "09:00",
                "location": "Example Venue 3",
                "description": "Yet another example event description."
              },
              {
                "id": 4,
                "title": "Example Event 4",
                "date": "2023-05-22",
                "time": "18:30",
                "location": "Example Venue 4",
                "description": "This is another example event description."
              }
        ],
      });
    },
  });

  return server;
}
