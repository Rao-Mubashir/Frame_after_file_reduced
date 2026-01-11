import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { BlogHero } from '../components/BlogHero';
import { BlogGrid } from '../components/BlogGrid';
import { Footer } from '../components/Footer';
import { BlogPost } from '../components/BlogPost';

export default function Blog() {
  const { blogId } = useParams();

  return (
    <div className="min-h-screen">
      <Navbar />
      {blogId ? <BlogPost /> : (
        <>
          <BlogHero />
          <BlogGrid />
        </>
      )}
      <Footer />
    </div>
  );
}
