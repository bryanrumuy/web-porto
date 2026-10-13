import { PixelSprite } from "../components/PixelSprite";
import { TORCH_A, TORCH_B } from "./art";

type TorchProps = { side: "left" | "right" };

export function Torch({ side }: TorchProps) {
  return (
    <div className={`torch torch-${side}`} aria-hidden="true">
      <PixelSprite sprite={TORCH_A} scale={8} className="torch-frame-a" />
      <PixelSprite sprite={TORCH_B} scale={8} className="torch-frame-b" />
    </div>
  );
}
