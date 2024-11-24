package com.makesoft.makesoft.classes;

import jakarta.persistence.*;

/**
 * Represents a review entity.
 */
@Entity
public class Review {

    /**
     * The student who is giving the review.
     */
    @ManyToOne
    @JoinColumn(name = "reviewerId")
    private Student reviewer;

    /**
     * The student who is being reviewed.
     */
    @ManyToOne
    @JoinColumn(name = "revieweeId")
    private Student reviewee;

    /**
     * The unique identifier for the review.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * The cooperation rating given by the reviewer.
     */
    private int cooperation;

    /**
     * The comment on cooperation given by the reviewer.
     */
    private String cooperationComment;

    /**
     * The conceptual contribution rating given by the reviewer.
     */
    private int conceptualContribution;

    /**
     * The comment on conceptual contribution given by the reviewer.
     */
    private String conceptualContributionComment;

    /**
     * The practical contribution rating given by the reviewer.
     */
    private int practicalContribution;

    /**
     * The comment on practical contribution given by the reviewer.
     */
    private String practicalContributionComment;

    /**
     * The work ethic rating given by the reviewer.
     */
    private int workEthic;

    /**
     * The comment on work ethic given by the reviewer.
     */
    private String workEthicComment;

    /**
     * Default constructor for Review.
     */
    public Review() {
    }

    /**
     * Constructs a new Review with the specified details.
     *
     * @param reviewer the student who is giving the review
     * @param reviewee the student who is being reviewed
     * @param cooperation the cooperation rating
     * @param cooperationComment the comment on cooperation
     * @param conceptualContribution the conceptual contribution rating
     * @param conceptualContributionComment the comment on conceptual contribution
     * @param practicalContribution the practical contribution rating
     * @param workEthic the work ethic rating
     * @param workEthicComment the comment on work ethic
     * @param practicalContributionComment the comment on practical contribution
     */
    public Review(Student reviewer, Student reviewee, int cooperation, String cooperationComment, int conceptualContribution, String conceptualContributionComment, int practicalContribution, int workEthic, String workEthicComment, String practicalContributionComment) {
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.cooperation = cooperation;
        this.cooperationComment = cooperationComment;
        this.conceptualContribution = conceptualContribution;
        this.conceptualContributionComment = conceptualContributionComment;
        this.practicalContribution = practicalContribution;
        this.workEthic = workEthic;
        this.workEthicComment = workEthicComment;
        this.practicalContributionComment = practicalContributionComment;
    }

    /**
     * Sets the unique identifier for the review.
     *
     * @param id the unique identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the unique identifier for the review.
     *
     * @return the unique identifier
     */
    public Long getId() {
        return id;
    }

    /**
     * Gets the student who is giving the review.
     *
     * @return the reviewer
     */
    public Student getReviewer() {
        return reviewer;
    }

    /**
     * Sets the student who is giving the review.
     *
     * @param reviewer the reviewer
     */
    public void setReviewer(Student reviewer) {
        this.reviewer = reviewer;
    }

    /**
     * Gets the student who is being reviewed.
     *
     * @return the reviewee
     */
    public Student getReviewee() {
        return reviewee;
    }

    /**
     * Sets the student who is being reviewed.
     *
     * @param reviewee the reviewee
     */
    public void setReviewee(Student reviewee) {
        this.reviewee = reviewee;
    }

    /**
     * Gets the cooperation rating.
     *
     * @return the cooperation rating
     */
    public int getCooperation() {
        return cooperation;
    }

    /**
     * Sets the cooperation rating.
     *
     * @param cooperation the cooperation rating
     */
    public void setCooperation(int cooperation) {
        this.cooperation = cooperation;
    }

    /**
     * Gets the comment on cooperation.
     *
     * @return the cooperation comment
     */
    public String getCooperationComment() {
        return cooperationComment;
    }

    /**
     * Sets the comment on cooperation.
     *
     * @param cooperationComment the cooperation comment
     */
    public void setCooperationComment(String cooperationComment) {
        this.cooperationComment = cooperationComment;
    }

    /**
     * Gets the conceptual contribution rating.
     *
     * @return the conceptual contribution rating
     */
    public int getConceptualContribution() {
        return conceptualContribution;
    }

    /**
     * Sets the conceptual contribution rating.
     *
     * @param conceptualContribution the conceptual contribution rating
     */
    public void setConceptualContribution(int conceptualContribution) {
        this.conceptualContribution = conceptualContribution;
    }

    /**
     * Gets the comment on conceptual contribution.
     *
     * @return the conceptual contribution comment
     */
    public String getConceptualContributionComment() {
        return conceptualContributionComment;
    }

    /**
     * Sets the comment on conceptual contribution.
     *
     * @param conceptualContributionComment the conceptual contribution comment
     */
    public void setConceptualContributionComment(String conceptualContributionComment) {
        this.conceptualContributionComment = conceptualContributionComment;
    }

    /**
     * Gets the practical contribution rating.
     *
     * @return the practical contribution rating
     */
    public int getPracticalContribution() {
        return practicalContribution;
    }

    /**
     * Sets the practical contribution rating.
     *
     * @param practicalContribution the practical contribution rating
     */
    public void setPracticalContribution(int practicalContribution) {
        this.practicalContribution = practicalContribution;
    }

    /**
     * Gets the work ethic rating.
     *
     * @return the work ethic rating
     */
    public int getWorkEthic() {
        return workEthic;
    }

    /**
     * Sets the work ethic rating.
     *
     * @param workEthic the work ethic rating
     */
    public void setWorkEthic(int workEthic) {
        this.workEthic = workEthic;
    }

    /**
     * Gets the comment on work ethic.
     *
     * @return the work ethic comment
     */
    public String getWorkEthicComment() {
        return workEthicComment;
    }

    /**
     * Sets the comment on work ethic.
     *
     * @param workEthicComment the work ethic comment
     */
    public void setWorkEthicComment(String workEthicComment) {
        this.workEthicComment = workEthicComment;
    }

    /**
     * Gets the comment on practical contribution.
     *
     * @return the practical contribution comment
     */
    public String getPracticalContributionComment() {
        return practicalContributionComment;
    }

    /**
     * Sets the comment on practical contribution.
     *
     * @param practicalContributionComment the practical contribution comment
     */
    public void setPracticalContributionComment(String practicalContributionComment) {
        this.practicalContributionComment = practicalContributionComment;
    }
}