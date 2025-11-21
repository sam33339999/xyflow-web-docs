import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { OnDropAction, useDnD, useDnDPosition } from './useDnD';

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
let id = 0;
const getId = () => `dndnode_${id++}`;

export function Sidebar() {
  const { onDragStart, isDragging } = useDnD();
  // The type of the node that is being dragged.
  const [type, setType] = useState<string | null>(null);

  const { setNodes } = useReactFlow();

  const createAddNewNode = useCallback(
    (nodeType: string): OnDropAction => {
      return ({ position }: { position: XYPosition }) => {
        // Here, we create a new node and add it to the flow.
        // You can customize the behavior of what happens when a node is dropped on the flow here.
        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType === 'input' ? '輸入' : nodeType === 'output' ? '輸出' : '預設'}節點` },
        };

        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes, setType],
  );

  return (
    <>
      {/* The ghost node will be rendered at pointer position when dragging. */}
      {isDragging && <DragGhost type={type} />}
      <aside>
        <div className="description">
          拖曳這些節點到面板上建立新節點
        </div>
        <div
          className="dndnode input"
          onPointerDown={(event) => {
            setType('input');
            onDragStart(event, createAddNewNode('input'));
          }}
        >
          輸入節點
        </div>
        <div
          className="dndnode"
          onPointerDown={(event) => {
            setType('default');
            onDragStart(event, createAddNewNode('default'));
          }}
        >
          預設節點
        </div>
        <div
          className="dndnode output"
          onPointerDown={(event) => {
            setType('output');
            onDragStart(event, createAddNewNode('output'));
          }}
        >
          輸出節點
        </div>
      </aside>
    </>
  );
}

interface DragGhostProps {
  type: string | null;
}

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export function DragGhost({ type }: DragGhostProps) {
  const { position } = useDnDPosition();

  if (!position) return null;

  return (
    <div
      className={`dndnode ghostnode ${type}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type === 'input' ? '輸入' : type === 'output' ? '輸出' : '預設'}節點`}
    </div>
  );
}
