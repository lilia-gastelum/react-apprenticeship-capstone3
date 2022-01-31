import { fireEvent, render, screen } from "@testing-library/react";
import Notes from "./Notes";
import AuthProvider from "../../utils/providers/Auth.provider";
import { NotesContextProvider } from "../../utils/contexts/NotesContext";
import { TermContextProvider } from "../../utils/contexts/TermContext";

describe("tests Notes Component", () => {
  test("creates new note", async () => {
    render(
      <AuthProvider>
        <NotesContextProvider>
          <TermContextProvider>
            <Notes />
          </TermContextProvider>
        </NotesContextProvider>
      </AuthProvider>
    );
    const createOption = screen.getByText(/Take a note.../i);
    expect(createOption).toBeInTheDocument();
    fireEvent.click(createOption);
    const titleInput = await screen.findByTitle(/title/i);
    fireEvent.change(titleInput, { target: { value: "Test title" } });
    const textInput = await screen.findByTitle(/text/i);
    fireEvent.change(textInput, {
      target: { value: "This is a test text for the note" },
    });
    const saveButton = await screen.findByText(/Save/i);
    fireEvent.click(saveButton);

    const note = await screen.findByText(/Test title/i);
    expect(note).toBeInTheDocument();
  });

  test("updating an existing note", async () => {
    render(
      <AuthProvider>
        <NotesContextProvider>
          <TermContextProvider>
            <Notes />
          </TermContextProvider>
        </NotesContextProvider>
      </AuthProvider>
    );
    const createOption = screen.getByText(/Take a note.../i);
    expect(createOption).toBeInTheDocument();
    fireEvent.click(createOption);
    const titleInput = await screen.findByTitle(/title/i);
    fireEvent.change(titleInput, { target: { value: "Note to update" } });
    const textInput = await screen.findByTitle(/text/i);
    fireEvent.change(textInput, { target: { value: "First text" } });
    const saveButton = await screen.findByText(/Save/i);
    fireEvent.click(saveButton);

    const edit = await screen.findByTitle(/2/i);
    fireEvent.click(edit);

    const updateText = await screen.findByTitle(/updatedText/i);
    fireEvent.change(updateText, { target: { value: "Second text" } });
    const updateButton = await screen.findByText(/Save/i);
    fireEvent.click(updateButton);

    const updated = await screen.findByText(/Second text/i);
    expect(updated).toBeInTheDocument();
  });

  test("archives an existing note", async () => {
    render(
      <AuthProvider>
        <NotesContextProvider>
          <TermContextProvider>
            <Notes />
          </TermContextProvider>
        </NotesContextProvider>
      </AuthProvider>
    );
    const archiveButtons = await screen.findAllByAltText(/archive/i);
    expect(archiveButtons.length).toBe(2);
    fireEvent.click(archiveButtons[1])

    const remainingArchiveButtons = await screen.findAllByAltText(/archive/i);
    expect(remainingArchiveButtons.length).toBe(1);
  });
});
