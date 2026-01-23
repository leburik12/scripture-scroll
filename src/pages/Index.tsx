import { BibleReader } from "@/components/BibleReader";
import { useBibleLoader } from "@/hooks/useBibleLoader";
import { BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const { isLoading, error, progress } = useBibleLoader();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md w-full">
          <div className="mb-8">
            <BookOpen className="w-16 h-16 mx-auto text-primary animate-pulse" />
          </div>
          <h1 className="text-2xl font-scripture text-foreground mb-2">
            መጽሐፍ ቅዱስ
          </h1>
          <p className="text-muted-foreground mb-6">
            Amharic Bible
          </p>
          <Progress value={progress} className="w-full mb-4" />
          <p className="text-sm text-muted-foreground">
            በመጫን ላይ... {progress}%
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h1 className="text-xl font-semibold text-foreground mb-2">
            ስህተት ተፈጥሯል
          </h1>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            እንደገና ሞክር
          </button>
        </div>
      </div>
    );
  }

  return <BibleReader />;
};

export default Index;
