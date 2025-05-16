
import React from "react";
import { useAgendamentosForm } from "@/hooks/useAgendamentosForm";
import MediaUploadForm from "@/components/agendamentos/MediaUploadForm";
import ScheduleForm from "@/components/agendamentos/ScheduleForm";

interface NovoAgendamentoProps {
  onSuccess?: () => void;
}

const NovoAgendamento: React.FC<NovoAgendamentoProps> = ({ onSuccess }) => {
  const {
    uploadFile,
    mediaTitle,
    mediaDescription,
    mediaType,
    selectedPlatform,
    scheduledDate,
    scheduledTime,
    postCaption,
    postHashtags,
    isUploading,
    isSubmitting,
    progress,
    handleFileChange,
    handleUploadAndSchedule,
    setMediaTitle,
    setMediaDescription,
    setMediaType,
    setSelectedPlatform,
    setScheduledDate,
    setScheduledTime,
    setPostCaption,
    setPostHashtags,
  } = useAgendamentosForm();

  const handleSubmit = async () => {
    const success = await handleUploadAndSchedule();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MediaUploadForm 
        uploadFile={uploadFile}
        mediaTitle={mediaTitle}
        mediaDescription={mediaDescription}
        mediaType={mediaType}
        onFileChange={handleFileChange}
        onTitleChange={setMediaTitle}
        onDescriptionChange={setMediaDescription}
        onMediaTypeChange={setMediaType}
      />

      <ScheduleForm 
        selectedPlatform={selectedPlatform}
        scheduledDate={scheduledDate}
        scheduledTime={scheduledTime}
        postCaption={postCaption}
        postHashtags={postHashtags}
        isSubmitting={isSubmitting}
        isUploading={isUploading}
        progress={progress}
        onPlatformChange={setSelectedPlatform}
        onDateChange={setScheduledDate}
        onTimeChange={setScheduledTime}
        onCaptionChange={setPostCaption}
        onHashtagsChange={setPostHashtags}
        onSubmit={handleSubmit}
        disabled={!uploadFile}
      />
    </div>
  );
};

export default NovoAgendamento;
