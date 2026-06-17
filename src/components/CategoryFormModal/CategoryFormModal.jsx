import { useState } from "react";
import {
  Button,
  Field,
  Input,
  Modal,
} from "@zendesk-ui/react-components";
import "./CategoryFormModal.css";

export default function CategoryFormModal({ onClose, onSave }) {
  const [name, setName] = useState("");

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave?.(name.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <Modal onClose={onClose} className="category-form-modal">
      <Modal.Header tag="h2">Create category</Modal.Header>
      <Modal.Body>
        <Field>
          <Field.Label>Category name</Field.Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter category name"
            autoFocus
          />
        </Field>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button isBasic onClick={onClose}>
            Cancel
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button isPrimary onClick={handleSave} disabled={!canSave}>
            Create category
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
      <Modal.Close aria-label="Close" />
    </Modal>
  );
}
