import { useState, useEffect } from "react";
import {
  Button,
  Field,
  Input,
  Modal,
  Select,
  SM,
} from "@zendesk-ui/react-components";
import "./SkillFormModal.css";

export default function SkillFormModal({
  mode = "create",
  categories = [],
  initialCategoryId,
  initialSkill,
  onClose,
  onSave,
}) {
  const [name, setName] = useState(initialSkill?.name ?? "");
  const [intents, setIntents] = useState(initialSkill?.intents ?? "");
  const [categoryId, setCategoryId] = useState(
    initialSkill?.categoryId ?? initialCategoryId ?? categories[0]?.id ?? ""
  );

  useEffect(() => {
    setName(initialSkill?.name ?? "");
    setIntents(initialSkill?.intents ?? "");
    setCategoryId(
      initialSkill?.categoryId ?? initialCategoryId ?? categories[0]?.id ?? ""
    );
  }, [initialSkill, initialCategoryId, categories]);

  const isEdit = mode === "edit";

  const hasChanges = isEdit
    ? name !== initialSkill?.name ||
      intents !== initialSkill?.intents ||
      categoryId !== initialSkill?.categoryId
    : name.trim().length > 0;

  const canSave = name.trim().length > 0 && hasChanges;

  const handleSave = () => {
    if (!canSave) return;
    onSave?.({ name: name.trim(), intents: intents.trim(), categoryId });
  };

  const title = isEdit ? "Edit skill" : "Create skill";
  const primaryLabel = isEdit ? "Save" : "Create skill";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleSave();
  };

  return (
    <Modal onClose={onClose} className="skill-form-modal">
      <Modal.Header tag="h2">{title}</Modal.Header>
      <Modal.Body>
        <div className="skill-form-modal__fields">
          <Field>
            <Field.Label>Skill name</Field.Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter skill name"
              autoFocus
            />
          </Field>

          <Field>
            <Field.Label>Intents</Field.Label>
            <Field.Hint>
              Describe the ticket intents that map to this skill.
            </Field.Hint>
            <Input
              value={intents}
              onChange={(e) => setIntents(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Billing questions, payment failures"
            />
          </Field>

          <Field>
            <Field.Label>Category</Field.Label>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button isBasic onClick={onClose}>
            Cancel
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button isPrimary onClick={handleSave} disabled={!canSave}>
            {primaryLabel}
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
      <Modal.Close aria-label="Close" />
    </Modal>
  );
}
