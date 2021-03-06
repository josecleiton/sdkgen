import type { AstNode, Type } from "../ast";
import { TypeDefinition } from "../ast";
import { SemanticError, Visitor } from "./visitor";

export class CheckMultipleDeclarationVisitor extends Visitor {
  nameToType = new Map<string, Type>();

  visit(node: AstNode): void {
    if (node instanceof TypeDefinition) {
      const previousType = this.nameToType.get(node.name);

      if (previousType && JSON.stringify(previousType) !== JSON.stringify(node.type)) {
        throw new SemanticError(`Type '${node.name}' at ${node.location} is defined multiple times (also at ${previousType.location})`);
      }

      this.nameToType.set(node.name, node.type);
    }

    super.visit(node);
  }
}
