@@ -1,334 +1,479 @@

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Star, StarHalf, UserRound, PenLine, ThumbsUp, Flag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Filter,
  Search,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2
} from 'lucide-react';

type Review = {
interface Review {
  id: string;
  author: string;
  authorImage?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  propertyId: string;
  propertyTitle: string;
  rating: number;
  date: Date;
  title: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  verified: boolean;
  helpful: number;
  userHelpfulVote: boolean;
};
}

type ReviewSystemProps = {
  propertyId?: number;
  agentId?: number;
};
interface Reply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
}

const ReviewSystem = ({ propertyId, agentId }: ReviewSystemProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('read');
  const [userReview, setUserReview] = useState<string>('');
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
const ReviewSystem = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      authorImage: undefined,
      userId: 'user1',
      userName: 'Priya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c7c2?w=150',
      propertyId: 'prop1',
      propertyTitle: 'Luxury Villa in Srinagar',
      rating: 5,
      date: new Date(2023, 3, 15),
      content: 'Working with Royal Group was an absolute pleasure. The agent was very professional, responsive, and truly understood what we were looking for in a home. They made the entire process smooth and stress-free!',
      helpful: 12,
      userHelpfulVote: false
      title: 'Outstanding Property!',
      content: 'This villa exceeded all our expectations. The location is perfect with stunning views of Dal Lake. The amenities are top-notch and the surrounding area is very peaceful. Highly recommended for families looking for a premium experience.',
      date: '2024-01-15',
      likes: 12,
      dislikes: 1,
      replies: [
        {
          id: 'reply1',
          userId: 'agent1',
          userName: 'Royal Group Agent',
          content: 'Thank you for your wonderful review, Priya! We\'re delighted that you enjoyed your stay.',
          date: '2024-01-16'
        }
      ],
      verified: true,
      helpful: 15
    },
    {
      id: '2',
      author: 'Michael Chen',
      authorImage: undefined,
      rating: 4.5,
      date: new Date(2023, 4, 2),
      content: 'Great experience overall. The agent was knowledgeable about the local market and helped us negotiate a fair price. Only reason for 4.5 stars is that sometimes response time was a bit slow, but otherwise excellent service.',
      helpful: 8,
      userHelpfulVote: true
    },
    {
      id: '3',
      author: 'David Smith',
      authorImage: undefined,
      userId: 'user2',
      userName: 'Rajesh Kumar',
      propertyId: 'prop2',
      propertyTitle: 'Modern Apartment in Delhi',
      rating: 4,
      date: new Date(2023, 5, 18),
      content: 'Good service and professional team. They helped us find a property that matched most of our requirements. The process took a bit longer than expected, but we are happy with the result.',
      helpful: 5,
      userHelpfulVote: false
    }
      title: 'Great Value for Money',
      content: 'Good location with excellent connectivity to metro stations. The apartment is well-maintained and has all necessary amenities. Only minor issue was the parking space.',
      date: '2024-01-14',
      likes: 8,
      dislikes: 0,
      replies: [],
      verified: false,
      helpful: 8
    },
  ]);

  const [newReview, setNewReview] = useState({
    propertyId: '',
    rating: 5,
    title: '',
    content: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

  const StarRating = ({ rating, onRatingChange, readonly = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
    if (!newReview.title || !newReview.content || !newReview.propertyId) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (userReview.trim() === '') {
      toast({
        title: "Review Required",
        description: "Please write your review before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        author: 'You',
        authorImage: undefined,
        rating: userRating,
        date: new Date(),
        content: userReview,
        helpful: 0,
        userHelpfulVote: false
      };
      
      setReviews([newReview, ...reviews]);
      setUserReview('');
      setUserRating(0);
      setIsSubmitting(false);
      setActiveTab('read');
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!"
      });
    }, 1000);
  };

  const handleHelpfulClick = (id: string) => {
    setReviews(reviews.map(review => {
      if (review.id === id) {
        const newHelpfulCount = review.userHelpfulVote ? review.helpful - 1 : review.helpful + 1;
        
        return {
          ...review,
          helpful: newHelpfulCount,
          userHelpfulVote: !review.userHelpfulVote
        };
      }
      return review;
    }));
  };
    const review: Review = {
      id: Date.now().toString(),
      userId: 'current_user',
      userName: 'Current User',
      propertyId: newReview.propertyId,
      propertyTitle: 'Selected Property',
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      replies: [],
      verified: false,
      helpful: 0
    };

  const handleReportReview = (id: string) => {
    setReviews([review, ...reviews]);
    setNewReview({ propertyId: '', rating: 5, title: '', content: '' });
    
    toast({
      title: "Review Reported",
      description: "Thank you for your feedback. Our team will review this content."
      title: "Review Submitted",
      description: "Your review has been posted successfully",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  const handleLikeReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: review.likes + 1, helpful: review.helpful + 1 }
        : review
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  const handleDislikeReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, dislikes: review.dislikes + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const handleSubmitReply = (reviewId: string) => {
    if (!replyContent.trim()) return;

    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        // Interactive stars for leaving a review
        stars.push(
          <button
            key={i}
            type="button"
            onClick={() => setUserRating(i)}
            onMouseEnter={() => setHoveredRating(i)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-2xl focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                (hoveredRating || userRating) >= i
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      } else {
        // Display stars for a review
        if (i <= roundedRating) {
          stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
        } else if (i - 0.5 === roundedRating) {
          stars.push(<StarHalf key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
        } else {
          stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
        }
      }
    }
    const newReply: Reply = {
      id: Date.now().toString(),
      userId: 'current_user',
      userName: 'Current User',
      content: replyContent,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, replies: [...review.replies, newReply] }
        : review
    ));

    setReplyContent('');
    setShowReplyForm(null);

    return <div className="flex">{stars}</div>;
    toast({
      title: "Reply Posted",
      description: "Your reply has been added",
    });
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === null || review.rating === filterRating;
    
    return matchesSearch && matchesRating;
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2" /> Ratings & Reviews
        </CardTitle>
        <CardDescription>
          See what others think or leave your own review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="read">Read Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="write">Write a Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="read" className="space-y-4 pt-4">
            {reviews.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">{calculateAverageRating()}</div>
                    <div className="flex flex-col">
                      {renderStars(parseFloat(calculateAverageRating()))}
                      <span className="text-sm text-muted-foreground">
                        Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => setActiveTab('write')}>
                    <PenLine className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.authorImage} />
                            <AvatarFallback><UserRound className="h-5 w-5" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="text-sm text-muted-foreground ml-2">
                                {formatDate(review.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm">{review.content}</p>
                      
                      <div className="flex justify-between mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleHelpfulClick(review.id)}
                          className={review.userHelpfulVote ? 'text-primary' : ''}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${review.userHelpfulVote ? 'fill-current' : ''}`} />
                          Helpful ({review.helpful})
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReportReview(review.id)}
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews & Ratings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Share your experience and help others make informed decisions
          </p>
        </div>

        {/* Overview Stats */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(averageRating)} readonly />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Average Rating
                </p>
              </div>
            ) : (
              <div className="text-center py-10">
                <Star className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">No reviews yet. Be the first to leave one!</p>
                <Button onClick={() => setActiveTab('write')}>
                  <PenLine className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reviews.length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Reviews
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="write" className="space-y-4 pt-4">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {renderStars(userRating, true)}
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reviews.filter(r => r.verified).length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verified Reviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Write Review */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property ID</label>
              <Input
                placeholder="Enter property ID"
                value={newReview.propertyId}
                onChange={(e) => setNewReview({...newReview, propertyId: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <StarRating 
                rating={newReview.rating} 
                onRatingChange={(rating) => setNewReview({...newReview, rating})}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="block text-sm font-medium">
                Your Review
              </label>
            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <Input
                placeholder="Summarize your experience"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Review Content</label>
              <Textarea
                id="review"
                placeholder="Share your experience..."
                rows={5}
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="resize-none"
                placeholder="Share your detailed experience..."
                rows={4}
                value={newReview.content}
                onChange={(e) => setNewReview({...newReview, content: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Your review will be public and may help others make decisions.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab('read')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            <Button onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="md:w-48">
                <select
                  value={filterRating?.toString() || 'all'}
                  onChange={(e) => setFilterRating(e.target.value === 'all' ? null : parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.userName}</h3>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Property Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm font-medium">{review.propertyTitle}</p>
                    <StarRating rating={review.rating} readonly />
                  </div>

                  {/* Review Content */}
                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLikeReview(review.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.likes}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDislikeReview(review.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {review.dislikes}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    
                    <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                      {review.helpful} people found this helpful
                    </div>
                  </div>

                  {/* Replies */}
                  {review.replies.length > 0 && (
                    <div className="ml-8 space-y-3 pt-4 border-t">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">{reply.userName}</span>
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-sm">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {showReplyForm === review.id && (
                    <div className="ml-8 pt-4 border-t">
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSubmitReply(review.id)}
                          >
                            Post Reply
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowReplyForm(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
