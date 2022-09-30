class Node {
    constructor(x, y, parent = null) {
        this.x = x;
        this.y = y;
        this.parent = parent
    }
}

function knightMoves(init, goal) {
    const boardLength = 8;
    const rows = [2, 2, -2, -2, 1, 1, -1, -1];
    const cols = [-1, 1, 1, -1, 2, -2, 2, -2];
    const [x, y] = init;
    const [gX, gY] = goal;
    const queue = [];
    const visited = [];
    
    function validMoves(x, y, n) {
        const steps = [];
        
        for(let i = 0; i < boardLength; i++) {
            const row = rows[i];
            const col = cols[i];
            if (x + row >= 0 && y + col >= 0) {
                steps.push(new Node(x + row, y + col, n));
            }
        }
        return steps;
    }

    function consoleResult(node) {
        let tempNode = node.parent;
        let arr = [];

        while (tempNode.parent) {
            arr.push([tempNode.x, tempNode.y]);
            tempNode = tempNode.parent;
        }

        arr = arr.reverse();
        console.log(`You made it in ${arr.length + 1} moves! Here's your path:\n[${init}]\n${arr.reduce((a, v) => a += `[${v}]\n`, '')}[${goal}]`);
    } 

    queue.push(new Node(x, y));

    while (queue.length) {
        const node = queue.shift();
        if (node.x === gX && node.y === gY) {
            consoleResult(node);
            return;
        }
        if (!visited.some(coord => `${node.x},${node.y}` === coord)) {
            const moves = validMoves(node.x, node.y, node);

            visited.push(`${node.x},${node.y}`);
            queue.push(...moves);
        }
    }
}

console.log(knightMoves([0,0],[3,3]));
