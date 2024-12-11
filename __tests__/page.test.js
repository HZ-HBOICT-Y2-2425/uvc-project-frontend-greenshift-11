import { render, screen } from "@testing-library/svelte";
import Component from "../src/routes/+page.svelte";

test("it works", async () => {
  //render(Component);
  const welcomeText = await screen.findByText("Welcome");
  expect(welcomeText).toBeInTheDocument();
});
