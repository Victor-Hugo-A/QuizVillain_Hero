import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app'; // Caso queira usar um componente principal
import { routes } from './app/app.routes'; // Importa as rotas do arquivo de rotas

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // Usando as rotas configuradas
  ]
}).catch(err => console.error(err));
