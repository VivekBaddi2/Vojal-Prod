export default function ProductCard({ image, title, description }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-2">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
}
