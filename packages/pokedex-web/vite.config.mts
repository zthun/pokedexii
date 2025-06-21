import {
  ZViteConfigBuilder,
  ZViteServerBuilder,
} from "@zthun/janitor-build-config/vite";
import { defineConfig } from "vite";

const dev = new ZViteServerBuilder().dev().build();
const config = new ZViteConfigBuilder().react().server(dev).build();
export default defineConfig(config);
