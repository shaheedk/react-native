import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GRID_SIZE = 20;
const CELL_SIZE = 18;

export default function App() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    let head = [...snake[0]];

    if (direction === "UP") head[1]--;
    if (direction === "DOWN") head[1]++;
    if (direction === "LEFT") head[0]--;
    if (direction === "RIGHT") head[0]++;

    // Wall collision (Game Over)
    if (
      head[0] < 0 ||
      head[0] >= GRID_SIZE ||
      head[1] < 0 ||
      head[1] >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // Self-collision
    for (let segment of snake) {
      if (segment[0] === head[0] && segment[1] === head[1]) {
        setGameOver(true);
        return;
      }
    }

    const newSnake = [head, ...snake];

    // Eating
    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(score + 1);
      setFood([
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ]);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
  };

  return (
    <View className="flex-1 bg-black items-center justify-center">
      {/* Score */}
      <Text className="text-white text-3xl mb-4">Score: {score}</Text>

      {/* Game Board */}
      <View
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
        className="bg-neutral-900 relative"
      >
        {/* Snake */}
        {snake.map((segment, i) => (
          <View
            key={i}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment[0] * CELL_SIZE,
              top: segment[1] * CELL_SIZE,
            }}
            className="absolute bg-red-400 rounded"
          />
        ))}

        {/* Food */}
        <View
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food[0] * CELL_SIZE,
            top: food[1] * CELL_SIZE,
          }}
          className="absolute bg-red-500 rounded"
        />
      </View>

      {/* Controls */}
      <View className="flex-row mt-6 space-x-3">
        <TouchableOpacity onPress={() => setDirection("LEFT")}>
          <Text className="text-white text-2xl">⬅️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection("UP")}>
          <Text className="text-white text-2xl">⬆️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection("DOWN")}>
          <Text className="text-white text-2xl">⬇️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection("RIGHT")}>
          <Text className="text-white text-2xl">➡️</Text>
        </TouchableOpacity>
      </View>

      {/* Game Over */}
      {gameOver && (
        <View className="absolute bg-black/80 p-8 rounded-xl">
          <Text className="text-white text-4xl mb-4">GAME OVER</Text>
          <TouchableOpacity
            onPress={restartGame}
            className="bg-green-600 px-6 py-2 rounded-xl"
          >
            <Text className="text-white text-xl">Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
