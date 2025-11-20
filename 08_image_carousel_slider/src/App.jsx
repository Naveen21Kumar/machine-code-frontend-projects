import Carousel from './components/Carousel';

export default function App() {
  const images = [
    'https://picsum.photos/id/1015/400/250',
    'https://picsum.photos/id/1025/400/250',
    'https://picsum.photos/id/1035/400/250',
    'https://picsum.photos/id/1045/400/250',
  ];
  return (
    <div>
      <h2>Image Carousel</h2>
      <Carousel images={images} interval={20000} />
    </div>
  );
}
