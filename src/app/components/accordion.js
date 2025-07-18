export default function Accordion({ title, content, imageData, isOpen, onToggle }) {
  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden w-full">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 bg-blue-100 text-slate-900 hover:bg-slate-500 hover:text-slate-50 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium mr-5">{title}</span>
          <span className="text-xl text-blue">{isOpen ? "−" : "+"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-white border-t border-blue-200 flex flex-col gap-4">
          {imageData && (
            <div className="flex items-center justify-center">
              <img
                src={imageData}
                alt={title}
                className="w-sm h-full object-contain"
              />
            </div>
          )}
          {content && (
            <div
              className="whitespace-pre-wrap w-full text-slate-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      )}
    </div>
  );
}
