import { memo } from 'react';
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from '@xyflow/react';
import { isTextNode, type MyNode } from './initialElements';

function ResultNode() {
  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodesData = useNodesData<MyNode>(
    connections.map((connection) => connection.source),
  );
  const textNodes = nodesData.filter(isTextNode);

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div>
        傳入文字：{' '}
        {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
          '無'}
      </div>
    </div>
  );
}

export default memo(ResultNode);
