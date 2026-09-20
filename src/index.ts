import './styles/main.css';
import { AppRenderer } from './ui/render';

const app = document.getElementById('app');

if (app) {
  const renderer = new AppRenderer(app);
  renderer.render();
}
